import { Subjects } from '../../api-util-interfaces';
import { IBoardCreatedEvent } from './board-created-event';

export interface IBoardUpdatedEvent {
  subject: Subjects.BoardUpdated;
  data: IBoardCreatedEvent['data'];
}
