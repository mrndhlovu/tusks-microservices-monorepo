import { Publisher } from '@tusks/api/shared-services';
import { Subjects } from '../../api-util-interfaces';

export class CreateNotificationPublisher extends Publisher<ICreateNotificationEvent> {
  subject: Subjects.CreateNotification = Subjects.CreateNotification;
}

export interface ICreateNotificationEvent {
  subject: Subjects.CreateNotification;
  data: {
    body: string;
    id?: string;
    subject: string;
    title: string;
    actionKey?: string;
    user: {
      id: string;
      initials: string;
    };
  };
}
