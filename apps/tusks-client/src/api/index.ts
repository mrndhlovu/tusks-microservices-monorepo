import { AxiosError } from 'axios';
import { ILabelProps } from '../components/board/canvas/cardActions/CardLabels';
import { IUpdateWorkspace } from '../components/workspaces';
import {
  ICardDetails,
  ICardDraggingProps,
  IListDraggingProps,
} from '../lib/providers';
import END_POINTS from './endpoints';
import { AxiosConfig, ISsHeaders } from './axios-config';

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
  verificationCode: string;
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

export interface IRequestError {
  errors: [{ message: string; [key: string]: any }];
}

export interface IAxiosInterceptorError {
  status: AxiosError['response']['status'];
  message: string[] | string;
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

interface IUpdateBoardData {
  [key: string]: any;
}

export class API extends AxiosConfig {
  ssrHeaders?: ISsHeaders;

  constructor(ssrHeaders?: ISsHeaders) {
    super(ssrHeaders);
  }

  /**
   *
   * @param userData
   * @returns
   */

  signupUser = async (userData: ISignupCredentials) =>
    await this.http.post(END_POINTS.signup, userData);

  /**
   *
   * @returns
   */

  logoutUser = async () => await this.http.get(END_POINTS.logout);

  logoutAllSessions = async () => await this.http.get(END_POINTS.logoutAll);

  loginUser = async (data: ILoginCredentials) =>
    await this.http.post(END_POINTS.login, data);

  deleteUser = async () => await this.http.delete(END_POINTS.deleteUser);

  getCurrentUser = async () => {
    return await this.http.get(END_POINTS.currentUser);
  };

  handleUpdateUser = async (data: { [key: string]: any }) => {
    return await this.http.patch(END_POINTS.updateUser, data);
  };

  forgotPassword = async (data: { [key: string]: any }) => {
    return await this.http.post(END_POINTS.forgotPassword, data);
  };

  restoreAccount = async (data: { [key: string]: any }) => {
    return await this.http.post(END_POINTS.restoreAccount, data);
  };

  restoreAccountVerifyEmail = async (data: { [key: string]: any }) => {
    return await this.http.post(END_POINTS.restoreAccountVerifyEmail, data);
  };

  updatePassword = async (data: { password: string }, token: string) => {
    this.bearerToken = token;
    return await this.http.patch(END_POINTS.updatePassword, data);
  };

  refreshAuthToken = async () => {
    return await this.http.get(END_POINTS.refreshToken);
  };

  verifyOtp = async (data: ICodeVerification, token: string) => {
    this.bearerToken = token;
    return await this.http.post(END_POINTS.verifyOtp, data);
  };

  verifyAccount = async (token: string) => {
    return await this.http.get(`${END_POINTS.verify}/${token}`);
  };

  requestNewVerificationLink = async data => {
    return await this.http.post(`${END_POINTS.requestLink}`, data);
  };

  requestNewOtp = async data => {
    return await this.http.post(`${END_POINTS.resendOtp}`, data);
  };

  connectMultiFactorAuth = async (data: INewMfaData) => {
    return await this.http.post(END_POINTS.connectMfa, data);
  };

  generateQrCode = async () => {
    return await this.http.get(END_POINTS.getQrCodeImage);
  };

  createNewBoard = async (data: INewBoardData) => {
    return await this.http.post(END_POINTS.createBoard, data);
  };

  verifyUserCredentials = async (data: ILoginCredentials) => {
    return await this.http.post(END_POINTS.confirmAction, data);
  };

  getBoards = async () => {
    return await this.http.get(END_POINTS.boards);
  };

  getBoardById = async (boardId: string) => {
    return await this.http.get(`${END_POINTS.boards}/${boardId}`);
  };

  async getAttachments(boardId: string) {
    return await this.http.get(`${END_POINTS.boards}/${boardId}/attachments`);
  }

  updateBoard = async (data: IUpdateBoardData, boardId: string) => {
    return await this.http.patch(`${END_POINTS.boards}/${boardId}`, data);
  };

  async deleteBoard(boardId: string) {
    return await this.http.delete(`${END_POINTS.boards}/${boardId}`);
  }
  async deleteAttachment(attachmentId: string) {
    return await this.http.delete(
      `${END_POINTS.boards}/${attachmentId}/del-attachment`,
    );
  }

  async updateList(
    data: { [key: string]: any },
    options: { listId: string; boardId: string },
  ) {
    return await this.http.patch(
      `${END_POINTS.lists}/${options.boardId}/${options.listId}`,
      data,
    );
  }

  async updateCard(
    data: { [key: string]: any },
    options: { listId: string; cardId: string },
  ) {
    return await this.http.patch(
      `${END_POINTS.cards}/id/${options.cardId}/${options.listId}`,
      data,
    );
  }

  async createLabel(data: ILabelProps) {
    return await this.http.post(`${END_POINTS.cards}/new-label/`, data);
  }

  async getUserCardLabels() {
    return await this.http.get(`${END_POINTS.cards}/user/labels`);
  }

  async deleteLabel(labelId: string) {
    return await this.http.delete(`${END_POINTS.cards}/label/${labelId}`);
  }

  async createList(data: { [key: string]: any }, boardId: string) {
    return await this.http.post(`${END_POINTS.lists}/create/${boardId}`, data);
  }

  async createCard(
    data: { [key: string]: any },
    options: { listId: string; boardId: string },
  ) {
    return await this.http.post(
      `${END_POINTS.cards}/${options.listId}/${options.boardId}`,
      data,
    );
  }

  async createChecklist(data: { title: string; cardId: string }) {
    return await this.http.post(`${END_POINTS.cards}/create-checklist`, data);
  }

  async updateChecklist(data: { [key: string]: any; checklistId: string }) {
    return await this.http.post(`${END_POINTS.cards}/update-checklist`, data);
  }

  async createTask(data: { item: string; checklistId: string }) {
    return await this.http.post(`${END_POINTS.cards}/create-task`, data);
  }

  async updateTask(data: { [key: string]: any; taskId: string }) {
    return await this.http.post(`${END_POINTS.cards}/update-task`, data);
  }

  async deleteChecklist(data: { cardId: string; checklistId: string }) {
    return await this.http.delete(
      `${END_POINTS.cards}/${data.cardId}/${data.checklistId}/del-checklist`,
    );
  }

  async deleteTask(data: { checklistId: string; taskId: string }) {
    return await this.http.delete(
      `${END_POINTS.cards}/${data.checklistId}/${data.taskId}/del-task`,
    );
  }

  async convertTaskToCard(data: {
    checklistId: string;
    taskId: string;
    boardId: string;
    listId: string;
  }) {
    return await this.http.post(`${END_POINTS.cards}/convert-task`, data);
  }

  async getPowerUps() {
    return await this.http.get(`${END_POINTS.accounts}/power-ups`);
  }

  async getActions(boardId: string, queryString: string) {
    return await this.http.get(
      `${END_POINTS.accounts}/${boardId}/actions${queryString}`,
    );
  }

  async getActionByAttachmentId(boardId: string, attachmentIds: string) {
    return await this.http.get(
      `${END_POINTS.accounts}/${boardId}/action?attachmentIds=${attachmentIds}`,
    );
  }

  async getCardAttachments(cardId: string) {
    return await this.http.get(`${END_POINTS.cards}/${cardId}/attachments`);
  }

  async getCardChecklists(cardId: string) {
    return await this.http.get(`${END_POINTS.cards}/${cardId}/checklists`);
  }

  async moveList(data: IListDraggingProps) {
    return await this.http.patch(`${END_POINTS.lists}/move`, data);
  }

  async moveCard(data: ICardDraggingProps) {
    return await this.http.patch(`${END_POINTS.cards}/move`, data);
  }

  async uploadImageCardCover(formData: FormData, cardId: string) {
    return await this.http.post(
      `${END_POINTS.cards}/upload/${cardId}/add-cover`,
      formData,
    );
  }

  async addLinkAttachment(
    data: { link: string; name: string },
    cardId: string,
  ) {
    return await this.http.post(
      `${END_POINTS.cards}/upload/${cardId}/add-link-attachment`,
      data,
    );
  }

  async uploadAttachment(formData: FormData, cardId: string) {
    return await this.http.post(
      `${END_POINTS.cards}/${cardId}/upload/attachment`,
      formData,
    );
  }

  async updateAttachment(data: { title: string }, attachmentId: string) {
    return await this.http.patch(
      `${END_POINTS.cards}/${attachmentId}/update-attachment`,
      data,
    );
  }

  async updateRemoveAttachment(attachmentId: string) {
    return await this.http.delete(
      `${END_POINTS.cards}/${attachmentId}/del-attachment`,
    );
  }

  async uploadBoardBgImage(formData: FormData, boardId: string) {
    return await this.http.post(
      `${END_POINTS.boards}/upload/${boardId}/add-cover`,
      formData,
    );
  }

  async getUnsplashImages(params: {
    query: string;
    pageParam: number;
    perPage: number;
  }) {
    return await this.http
      .get(
        `${END_POINTS.boards}/unsplash/images?query=${params.query}&pageIndex=${params.pageParam}&perPage=${params.perPage}`,
      )
      .then(res => ({
        images: res.data.results,
        pageTotal: res.data.total_pages,
        page: params.pageParam,
      }))
      .catch(err => err.message);
  }

  createCustomerSubscription = async (data: ICardDetails) => {
    return await this.http.post(END_POINTS.payments, data);
  };

  getBillingOptions = async () => {
    return await this.http.get(END_POINTS.getBillingOptions);
  };

  getBillingHistory = async () => {
    return await this.http.get(END_POINTS.getBillingHistory);
  };

  //Spotify

  async getUsePlaylists(limit: number, offset: number) {
    return await this.http.get(
      `${END_POINTS.spotify}/playlists?limit=${limit}&offset=${offset}`,
    );
  }

  async getSpotifyRedirectUrl(scopes: string, state: string) {
    return await this.http.get(
      `${END_POINTS.spotify}/redirect?scopes=${scopes}&state=${state}`,
    );
  }

  async getSpotifyAuthToken(code: string) {
    return await this.http.get(`${END_POINTS.spotify}/connect?code=${code}`);
  }

  async revokeSpotifyAccess(powerUpId: string) {
    return await this.http.get(`${END_POINTS.spotify}/${powerUpId}/revoke`);
  }

  async selectPlayer(data: { deviceId: string; play: boolean }) {
    return await this.http.put(`${END_POINTS.spotify}/select-player`, data);
  }

  async spotifyModifyPlayback(data: {
    state: string;
    deviceId: string;
    seek?: number;
  }) {
    return await this.http.put(`${END_POINTS.spotify}/modify-playback`, data);
  }

  async getSpotifyDevices() {
    return await this.http.get(`${END_POINTS.spotify}/devices`);
  }

  async getCurrentlyPlaying() {
    return await this.http.get(`${END_POINTS.spotify}/current-playing`);
  }

  // Comments
  async comment(data: {
    boardId: string;
    cardId: string;
    comment: string;
    parentId?: string;
    fullName?: string;
    initials: string;
    username: string;
  }) {
    return await this.http.post(`${END_POINTS.accounts}/comment`, data);
  }

  async editComment(data: {
    commentId: string;
    comment: string;
    isLink?: boolean;
    textData?: { emoji: { [key: string]: any } };
  }) {
    return await this.http.post(`${END_POINTS.accounts}/edit-comment`, data);
  }

  async deleteComment(commentId: string) {
    return await this.http.delete(
      `${END_POINTS.accounts}/${commentId}/del-comment`,
    );
  }

  // Notifications

  async getNotifications() {
    return await this.http.get(`${END_POINTS.accounts}/notifications`);
  }

  async updateNotification(
    notificationId: string,
    data: { isRead?: boolean; archived?: boolean },
  ) {
    return await this.http.patch(
      `${END_POINTS.accounts}/${notificationId}/update-notification`,
      data,
    );
  }

  // Templates

  async getTemplates() {
    return await this.http.get(`${END_POINTS.boards}/templates`);
  }

  //Workspace
  async createWorkspace(data: IUpdateWorkspace) {
    return await this.http.post(`${END_POINTS.boards}/new-workspace`, data);
  }

  async getWorkspaces() {
    return await this.http.get(`${END_POINTS.boards}/workspaces`);
  }

  async getWorkspaceById(workspaceId: string) {
    return await this.http.get(
      `${END_POINTS.boards}/workspace?workspaceId=${workspaceId}`,
    );
  }

  async updateWorkspace(data: IUpdateWorkspace, workspaceId: string) {
    return await this.http.patch(
      `${END_POINTS.boards}/${workspaceId}/update-workspace`,
      data,
    );
  }

  async deleteWorkspace(workspaceId: string) {
    return await this.http.delete(
      `${END_POINTS.boards}/${workspaceId}/del-workspace`,
    );
  }

  async search(query: string) {
    return await this.http.get(
      `${END_POINTS.boards}/search?searchQuery=${query}`,
    );
  }

  async inviteToBoard(identifier: string, boardId: string) {
    return await this.http.get(
      `${END_POINTS.inviteToBoard}?identifier=${identifier}&boardId=${boardId}`,
    );
  }

  async acceptBoardInvite(token: string, boardInviteId: string) {
    this.bearerToken = token;

    return await this.http.get(
      `${END_POINTS.acceptBoardInvite}?boardInviteId=${boardInviteId}`,
    );
  }

  async getBoardMembers(memberIds: string) {
    return await this.http.get(
      `${END_POINTS.boardMembers}?memberIds=${memberIds}`,
    );
  }
}

export const apiClient = new API();
export default API;
