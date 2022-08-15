import { Subjects } from '../../api-util-interfaces';

export interface IListCreatedEvent {
  subject: Subjects.ListCreated;
  data: {
    id: string;
    boardId: string;
  };
}
