import { Publisher } from '@tusks/api/shared-services';
import { IAuthedActionEvent, Subjects } from '@tusks/api/util-interfaces';

export class AuthedActionPublisher extends Publisher<IAuthedActionEvent> {
  subject: Subjects.AuthedAction = Subjects.AuthedAction;
}
