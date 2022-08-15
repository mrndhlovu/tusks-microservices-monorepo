import { Publisher } from '@tusks/api/shared-services';
import { IUserCreatedEvent, Subjects } from '@tusks/api/util-interfaces';

export class UserCreatedPublisher extends Publisher<IUserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
