import { NextFunction, Request, Response } from 'express';
import { validationResult, oneOf, check } from 'express-validator';
import { BoardDocument } from '../models/Board';
import { boardService } from '../services/board';
import { allowedBoardUpdateFields } from '../utils/constants';
import { isValidObjectId } from 'mongoose';
import { IUploadFile } from '../types';
import {
  NotFoundError,
  BadRequestError,
  errorService,
  permissionManager,
  PermissionRequestError,
  RequestValidationError,
} from '@tusks/api/shared-services';
import { IPermissionType } from '@tusks/api/util-interfaces';

const { catchAsyncError } = errorService;

declare global {
  namespace Express {
    interface Request {
      board: BoardDocument | null | undefined;
      uploadFiles?: IUploadFile[];
    }
  }
}

class BoardMiddleware {
  verifyAccessPermission(requirePermissionFlag: IPermissionType) {
    return catchAsyncError(
      async (req: Request, _res: Response, next: NextFunction) => {
        const _id = req.params.boardId;

        if (!isValidObjectId(_id))
          throw new BadRequestError('Board id is required');

        const userId = req.currentUserJwt.userId!;

        const board = await boardService.findBoardOnlyById(_id);

        if (!board) throw new NotFoundError('Board with that id was not found');

        const existingBoardMember = board.members.find(
          (member: string) => member.indexOf(userId) > -1
        );

        if (!existingBoardMember) {
          throw new PermissionRequestError();
        }

        const [, permissionFlag] = existingBoardMember.split(':');

        const isGrantedPermission = permissionManager.checkIsPermitted(
          +permissionFlag,
          requirePermissionFlag
        );

        if (!isGrantedPermission) {
          throw new PermissionRequestError();
        }

        req.board = board;
        next();
      }
    );
  }

  serializeUpload = (req: Request, res: Response, next: NextFunction) => {
    const { files } = req;

    const mappedFiles: IUploadFile[] = (
      (files as Express.Multer.File[]) || []
    ).map((file) => ({
      name: file.originalname,
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      path: file.path,
      extension: `${file.originalname.split('.').pop()}`,
    }));

    req.uploadFiles = mappedFiles;

    return next();
  };

  checkRequiredBodyFields = [
    oneOf(
      allowedBoardUpdateFields.map((field: string) =>
        check(field).exists().trim().withMessage(`${field} is required.`)
      )
    ),
  ];

  validateRequestBodyFields = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      next();
    }
  );
}

export const boardMiddleware = new BoardMiddleware();
