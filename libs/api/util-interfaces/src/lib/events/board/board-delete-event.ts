import { Subjects } from '../../api-util-interfaces';
import { IBoardCreatedEvent } from './board-created-event';

export interface IBoardDeletedEvent {
  subject: Subjects.BoardDeleted;
  data: IBoardCreatedEvent['data'];
}
