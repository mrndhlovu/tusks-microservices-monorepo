import { CallbackError, ObjectId } from 'mongoose';
import { Request } from 'express';
import { v2 } from 'cloudinary';
import AWS from 'aws-sdk';
import axios from 'axios';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { allowedUploadTypes } from '../utils/constants';
import { IActionLoggerWithCardAndListOptions } from './card';
import { IRemoveRecordIdOptions, IUploadFile } from '../types';
import Board, { BoardDocument } from '../models/Board';
import {
  BadRequestError,
  NotFoundError,
  permissionManager,
} from '@tusks/api/shared-services';
import {
  ACTION_KEYS,
  ACTION_TYPES,
  IPermissionType,
  NewActionPublisher,
} from '@tusks/api/util-interfaces';

const cloudinary = v2;
const s3 = new AWS.S3();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

s3.config.update({
  region: process.env.REGION_AWS,
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
});

export interface IUpdateBoardMemberOptions {
  currentPermFlag: number;
  newRole: IPermissionType;
  isNew: boolean;
  userId: string;
}

export interface IActionLogger {
  type: ACTION_TYPES;
  actionKey: ACTION_KEYS;
  entities: {
    boardId: string;
    name?: string;
    workspace?: string;
  };
}

class BoardServices {
  updateBoardMemberRole = async (
    board: BoardDocument,
    options: IUpdateBoardMemberOptions
  ) => {
    const permissionFlag = permissionManager.updatePermission(
      options.currentPermFlag,
      options.newRole
    );

    const updatedMemberPermission = `${options.userId}:${permissionFlag}`;

    if (options.isNew) {
      board.members.push(updatedMemberPermission);
      return board;
    }

    const updateBoardRecord = await Board.findById(
      board._id,
      async (err: CallbackError, record: BoardDocument) => {
        if (err) {
          return new BadRequestError('Board not found');
        }

        const existingBoardMember = record?.members.find(
          (member: string) => member.indexOf(options.userId) > -1
        );

        if (existingBoardMember) {
          record?.members.map((member: string) => {
            if (member.indexOf(options.userId) > -1) {
              return updatedMemberPermission;
            }
          });
        } else {
          record?.members.push(updatedMemberPermission);
        }

        await record.save();

        return record;
      }
    );

    return updateBoardRecord;
  };

  diskStorage = multer({
    storage: multer.diskStorage({
      filename: function (_req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });

  s3Storage = multer({
    fileFilter: function (_req, file, cb) {
      const mimetype = file.mimetype.split('/')?.[1];

      if (allowedUploadTypes.includes(mimetype)) return cb(null, true);
      cb(new BadRequestError('File type cannot be uploaded!'));
    },
    storage: multerS3({
      s3,
      bucket: `${process.env.S3_BUCKET_AWS!}/attachments`,
      acl: 'public-read',
      metadata: function (_req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (_req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });

  async boardWithUpdatedMember(options: {
    memberId: string;
    boardId: string;
    role: IPermissionType;
    board?: BoardDocument;
  }) {
    const permissionFlag = permissionManager.updatePermission(
      permissionManager.permissions.BLOCKED,
      options.role
    );
    const boardMemberIdentifier = `${options.memberId}:${permissionFlag}`;

    if (!options.board) {
      return await Board.findOneAndUpdate(
        { _id: options.boardId },
        { $push: { members: boardMemberIdentifier } },
        { new: true }
      );
    }

    options.board.members.push(boardMemberIdentifier);
    return options.board;
  }

  validatedUpload(files: IUploadFile[]) {
    return files.every((file) => allowedUploadTypes.includes(file.extension));
  }

  async upload(files: IUploadFile[]) {
    if (!files.length || !files)
      throw new BadRequestError('No files attached!');

    const isValidFileType = this.validatedUpload(files);

    if (!isValidFileType)
      throw new BadRequestError(
        `Invalid file type!. Only ${allowedUploadTypes.join('/')} are allowed.`
      );

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        colors: true,
        folder: 'trello-clone',
      })
    );

    const response = await Promise.all(uploadPromises);

    return response;
  }

  async deleteImages(names: string[]) {
    const deletePromises = names.map((name) =>
      cloudinary.uploader.destroy(name)
    );

    const response = await Promise.all(deletePromises);

    return response;
  }

  async removeRecordIds(boardId: ObjectId, options: IRemoveRecordIdOptions) {
    const board = await Board.findByIdAndUpdate(boardId, {
      $pull: { ...options },
    });

    if (!board) throw new NotFoundError('Board not found');
    await board.save();

    return board;
  }

  getPopulatedBoard = async (boardId: string, userId?: string) => {
    const regex = new RegExp(userId!, 'i');

    console.log(regex, userId);

    const board = await Board.find({
      _id: boardId,
      members: { $regex: regex },
      archived: false,
    }).populate([
      {
        path: 'lists',
        match: {
          archived: { $ne: true },
        },
      },
      {
        path: 'cards',
        model: 'Card',
        match: {
          archived: { $ne: true },
        },
        populate: [
          { path: 'imageCover', model: 'Attachment' },
          {
            path: 'checklists',
            model: 'Checklist',
            populate: [{ path: 'tasks', model: 'Task' }],
          },
        ],
      },
    ]);

    return board?.[0];
  };

  async getUnsplash(query: string, pageIndex: number, perPage: number) {
    const IMAGES_EP = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}&per_page=${perPage}&page=${pageIndex}`;

    const response = await axios.get(IMAGES_EP);

    return response?.data;
  }

  findInvitedBoards(userId: string, invitedBoardList: string[]) {}

  findBoardOnlyByTitle = async (title: string) => {
    const board = await Board.findOne({ title });
    return board;
  };

  findBoardOnlyById = async (boardId: string) => {
    const board = await Board.findOne({ _id: boardId });

    if (!board) throw new BadRequestError('Board with that id was not found');

    return board;
  };

  validateEditableFields = <T>(allowedFields: T[], updates: T[]) => {
    return updates.every((update: T) => allowedFields.includes(update));
  };

  async logAction(req: Request, options: IActionLoggerWithCardAndListOptions) {
    await new NewActionPublisher(natsService.client).publish({
      type: options.type,
      userId: req.currentUserJwt.userId!,
      actionKey: options.actionKey,
      entities: { ...options.entities, attachment: options?.attachment },
    });
  }
}

const boardService = new BoardServices();

export { boardService };
