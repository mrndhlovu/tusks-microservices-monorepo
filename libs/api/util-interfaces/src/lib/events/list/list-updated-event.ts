import { Subjects } from '../../api-util-interfaces';

export interface IListUpdatedEvent {
  subject: Subjects.ListUpdated;
  data: {
    id: string;
    boardId: string;
  };
}
