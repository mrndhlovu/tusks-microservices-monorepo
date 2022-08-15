import { IEventUserData, Subjects } from '../../api-util-interfaces';

interface IData extends IEventUserData {
  boardInviteId?: string;
}

export interface IUserVerifiedEvent {
  subject: Subjects.UserVerified;
  data: IData;
}
