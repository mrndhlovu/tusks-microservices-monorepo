import { Publisher } from '@tusks/api/shared-services';
import { IUserDeletedEvent, Subjects } from '@tusks/api/util-interfaces';

export class UserDeletedPublisher extends Publisher<IUserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
}
