import { Subjects } from '../../api-util-interfaces';
export interface IBoardViewedEvent {
  subject: Subjects.BoardViewed;
  data: {
    userId: string;
    boardId: string;
  };
}
