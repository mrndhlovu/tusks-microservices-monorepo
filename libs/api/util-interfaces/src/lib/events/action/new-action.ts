import { Publisher } from '@tusks/api/shared-services';
import { Subjects } from '../../api-util-interfaces';
import { INewActionEvent } from '../user/new-action';

export class NewActionPublisher extends Publisher<INewActionEvent> {
  subject: Subjects.NewAction = Subjects.NewAction;
}
