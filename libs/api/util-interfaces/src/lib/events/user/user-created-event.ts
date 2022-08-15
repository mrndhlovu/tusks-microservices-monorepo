import { IEventUserData, Subjects } from '../../api-util-interfaces';

interface UserData extends IEventUserData {
  username: string;
  initials?: string;
  otp: string;
}

export interface IUserCreatedEvent {
  subject: Subjects.UserCreated;
  data: UserData;
}
