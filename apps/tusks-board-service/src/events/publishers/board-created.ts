import { Publisher } from '@tusks/api/shared-services';
import { IBoardCreatedEvent, Subjects } from '@tusks/api/util-interfaces';

export class BoardCreatedPublisher extends Publisher<IBoardCreatedEvent> {
  subject: Subjects.BoardCreated = Subjects.BoardCreated;
}
