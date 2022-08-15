import { Subjects } from '../../api-util-interfaces';
import { IBoardCreatedEvent } from './board-created-event';

export interface IGetBoardEvent {
  subject: Subjects.GetBoardById;
  data: IBoardCreatedEvent['data'];
}
