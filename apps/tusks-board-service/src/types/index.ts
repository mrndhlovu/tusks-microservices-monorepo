import { Types } from 'mongoose';

export interface IChangePosition {
  sourceCardId: string;
  targetCardId: string;
  sourceListId?: string;
  targetListId?: string;
  boardId?: string;
  targetBoardId?: string;
  isSwitchingList?: boolean;
  isSwitchingBoard?: boolean;
}

export interface IUploadFile {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
  path: string;
}

export interface IRemoveRecordIdOptions {
  [key: string]: { $in: Types.ObjectId[] };
}

export interface IUploadedFile {
  path: string;
}

export interface IFileUpload {
  upload: (files: IUploadFile[]) => Promise<IUploadedFile[]>;
}

export interface IFileUploader {
  upload: (
    files: File | File[]
  ) => Promise<IUploadedFile | IUploadedFile[] | undefined>;
}

export enum ACTIVE_BOARD_BG {
  COLOR = 'color',
  IMAGE = 'image',
}

export enum TASK_STATUS {
  TODO = 'todo',
  DONE = 'complete',
}

export interface TemplateList {
  name: string;
}
