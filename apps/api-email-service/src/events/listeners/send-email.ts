import { Listener } from '@tusks/api/shared-services';
import {
  IEmailEvent,
  queueGroupNames,
  Subjects,
} from '@tusks/api/util-interfaces';
import { Message } from 'node-nats-streaming';
import { EmailService } from '../../services/';

export class SendEmailListener extends Listener<IEmailEvent> {
  readonly subject: Subjects.Email = Subjects.Email;
  queueGroupName = queueGroupNames.EMAIL_QUEUE_GROUP;

  onMessage = async (data: IEmailEvent['data'], msg: Message) => {
    console.log('Event data', data);

    await EmailService.send(data);

    msg.ack();
  };
}
