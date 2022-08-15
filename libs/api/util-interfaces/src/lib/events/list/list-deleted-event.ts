import { Subjects } from '../../api-util-interfaces';

export interface IListDeletedEvent {
  subject: Subjects.ListDeleted;
  data: {
    id: string;
    boardId: string;
  };
}
