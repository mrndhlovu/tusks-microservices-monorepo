import { Publisher } from '@tusks/api/shared-services';
import { IBoardViewedEvent, Subjects } from '@tusks/api/util-interfaces';

export class BoardViewedPublisher extends Publisher<IBoardViewedEvent> {
  subject: Subjects.BoardViewed = Subjects.BoardViewed;
}
