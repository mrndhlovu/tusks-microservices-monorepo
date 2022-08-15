import { Subjects } from '../../api-util-interfaces';

export interface IBoardCreatedEvent {
  subject: Subjects.BoardCreated;
  data: {
    id: string;
    ownerId: string;
  };
}
