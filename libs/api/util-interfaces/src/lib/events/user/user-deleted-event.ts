import { IEventUserData, Subjects } from '../../api-util-interfaces';

interface UserData extends IEventUserData {
  email: string;
  boardIds: string[];
}

export interface IUserDeletedEvent {
  subject: Subjects.UserDeleted;
  data: UserData;
}
