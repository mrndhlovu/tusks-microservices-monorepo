import { Subjects } from '../../api-util-interfaces';
import { IBoardCreatedEvent } from './board-created-event';

export interface IGetBoardListEvent {
  subject: Subjects.GetBoards;
  data: IBoardCreatedEvent['data'][];
}
