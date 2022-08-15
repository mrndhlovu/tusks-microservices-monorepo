import { Publisher } from '@tusks/api/shared-services';
import { IUserVerifiedEvent, Subjects } from '@tusks/api/util-interfaces';

export class UserVerifiedPublisher extends Publisher<IUserVerifiedEvent> {
  subject: Subjects.UserVerified = Subjects.UserVerified;
}
