import { Publisher } from '@tusks/api/shared-services';
import { IBoardDeletedEvent, Subjects } from '@tusks/api/util-interfaces';

export class BoardDeletedPublisher extends Publisher<IBoardDeletedEvent> {
  subject: Subjects.BoardDeleted = Subjects.BoardDeleted;
}
