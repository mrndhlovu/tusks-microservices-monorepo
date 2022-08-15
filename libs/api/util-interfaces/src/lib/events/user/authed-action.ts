import {
  ACTION_TYPES,
  IEventUserData,
  Subjects,
} from '../../api-util-interfaces';

interface UserData extends IEventUserData {
  username: string;
  fullName?: string;
  initials: string;
}

export interface IAuthedActionEvent {
  subject: Subjects.AuthedAction;
  data: {
    actionKey: string;
    entities: { [key: string]: any };
    type: ACTION_TYPES;
    user: UserData;
  };
}
