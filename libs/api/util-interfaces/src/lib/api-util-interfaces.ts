export interface IJwtAccessTokens {
  access: string;
  refresh?: string;
  mfa?: string;
  exp?: string | number;
}
export enum JwtSignature {
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'refresh',
  USER_ROLE = 'role',
}

export interface IJwtAuthToken {
  userId?: string;
  username: string;
  name?: string;
  email: string;
  mfa?: {
    validated: boolean;
    enabled: boolean;
  };
  exp?: string | number;
  boardInviteId?: string;
}

export type IPermissionType =
  | 'BASIC'
  | 'BLOCKED'
  | 'EDITOR'
  | 'FULL_ACCESS'
  | 'OBSERVER'
  | 'OWNER'
  | 'STANDARD'
  | 'TRIAL';

export enum AccountOptions {
  Basic = 'basic',
  Free = 'free',
  Gold = 'gold',
}

export interface IAccountFields {
  expired: boolean;
  expiresAt: string;
  id: string;
  isTrial: boolean;
  isVerified: boolean;
  plan: AccountOptions;
  status: AccountStatus;
  email?: string;
}

export enum Subjects {
  AccountCreated = 'account:created',
  AccountDeleted = 'account:deleted',
  AccountUpdated = 'account:updated',

  CustomerCreated = 'customer:created',
  CustomerDeleted = 'customer:deleted',

  UserCreated = 'user:created',
  UserUpdated = 'user:updated',
  UserDeleted = 'user:deleted',
  GetUser = 'user:request',
  UserVerified = 'user:verified',

  BoardCreated = 'board:created',
  BoardDeleted = 'board:deleted',
  BoardUpdated = 'board:updated',
  BoardViewed = 'board:viewed',
  GetBoardById = 'board:by:id',
  GetBoards = 'boards:list',
  AddBoardMember = 'boards:new-member',

  ListCreated = 'list:created',
  ListUpdated = 'list:updated',
  ListDeleted = 'list:deleted',

  NewAction = 'action:new',
  AuthedAction = 'action:authenticated',

  Card = 'card:created',
  CardUpdated = 'card:updated',

  PaymentCreated = 'payments:created',
  PaymentFailed = 'payments:failed',

  Email = 'send:email',
  CreateNotification = 'create:notification',

  WorkspaceCreated = 'workspace:created',
  WorkspaceUpdated = 'workspace:updated',
}

export enum ACTION_KEYS {
  CREATE_BOARD = 'created:board',
  DELETED_BOARD = 'deleted:board',
  ARCHIVED_BOARD = 'archived:board',

  CREATE_CARD = 'created:card',
  TRANSFER_CARD = 'transferred:card',
  COMMENT_ON_CARD = 'commented:on:card',
  ADD_CHECKLIST = 'added:checklist:to:card',
  MOVE_CARD_TO_LIST = 'moved:card:from:list:to:list',
  MOVE_CARD_UP = 'moved:card:up',
  MOVE_CARD_DOWN = 'moved:card:down',
  DELETED_CARD = 'deleted:card',
  ARCHIVED_CARD = 'archived:card',
  CONVERT_TASK_TO_CARD = 'converted:task:to:card',
  CHANGED_CARD_COVER = 'added:card:cover',
  REMOVED_CARD_COVER = 'removed:card:cover',
  ADD_CARD_ATTACHMENT = 'added:card:attachment',
  REMOVE_CARD_ATTACHMENT = 'removed:card:attachment',

  CREATE_LIST = 'add:list:to:board',
  TRANSFER_LIST = 'transferred:list',
  DELETED_LIST = 'deleted:list',
  ARCHIVED_LIST = 'archived:list',
  MOVE_LIST_LEFT = 'move:list:left',
  MOVE_LIST_RIGHT = 'move:list:right',
}

export enum queueGroupNames {
  BOARDS_QUEUE_GROUP = 'boards-service',
  CARDS_QUEUE_GROUP = 'cards-service',
  LIST_QUEUE_GROUP = 'list-service',
  AUTH_QUEUE_GROUP = 'auth-service',
  AUTH_ACTION_QUEUE_GROUP = 'action-service',
  ACCOUNT_QUEUE_GROUP = 'accounts-service',
  PAYMENTS_QUEUE_GROUP = 'payment-service',
  EMAIL_QUEUE_GROUP = 'email-service',
}

export enum AccountStatus {
  Active = 'active',
  Cancelled = 'cancelled',
  Created = 'created',
  Pending = 'pending',
}

export enum ACTION_TYPES {
  ATTACHMENT = 'attachment',
  BOARD = 'board',
  CARD = 'card',
  CHECKLIST = 'checklist',
  COMMENT = 'comment',
  LIST = 'list',
  TASK = 'task',
}

export interface INewPayment {
  status: string;
  productId: string;
  startAt?: string;
  expiresAt?: string;
  customerId: string;
  orderId: string;
  ownerId: string;
  isTrial: boolean;
  plan: string;
}

export enum HTTPStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,

  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
}

export interface ISignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  identifier: string;
  password: string;
}

export interface ICodeVerification {
  code: string;
}

export interface ILabelProps {
  color: string;
  id?: string;
  cardId?: string;
  name?: string;
}

export interface INewBoardData {
  title: string;
  activeBg: string;
  prefs: {
    image?: string;
    color?: string;
  };
  workspaceId?: string;
}

export interface ICardDetails {
  productId?: string;
  priceId?: string;
  source?: string;
  currency?: 'usd' | 'eur';
  customerId?: string;
  amount?: string;
  paymentMethodId?: string;
  plan?: string;
}

export interface ICardDraggingProps {
  sourceCardId: string;
  targetCardId: string;
  sourceListId?: string;
  targetListId?: string;
  boardId?: string;
  isSwitchingList?: boolean;
  isSwitchingBoard?: boolean;
  targetBoardId?: string;
}

export interface IUpdateWorkspace {
  name?: string;
  category?: string;
  description?: string;
  shortname?: string;
  visibility?: 'private' | 'public';
}

export interface IRequestError {
  errors: [{ message: string; [key: string]: any }];
}

export interface INewMfaData {
  preference?: {
    email?: boolean;
    sms?: boolean;
    authenticator?: boolean;
  };
  code: string;
}

export interface IPasswordConfirmation {
  password: string;
}

export interface IListDraggingProps {
  sourceListId: string;
  targetListId: string;
  boardId?: string;
  isSwitchingBoard?: boolean;
  targetBoardId: string;
}

export interface IUpdateBoardData {
  [key: string]: any;
}

export interface IRequestError {
  errors: [{ message: string; [key: string]: any }];
}

export interface IEventUserData {
  email?: string;
  id: string;
  firstName?: string;
  lastName?: string;
  verified?: boolean;
}

export interface IRoleOptions {
  [key: string]: IPermissionType;
}

export const ACCOUNT_TYPE: IRoleOptions = {
  FULL_ACCESS: 'FULL_ACCESS',
  STANDARD: 'STANDARD',
  BASIC: 'BASIC',
  TRIAL: 'TRIAL',
};

export const ROLES: IRoleOptions = {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR',
  OBSERVER: 'OBSERVER',
  BLOCKED: 'BLOCKED',
};
