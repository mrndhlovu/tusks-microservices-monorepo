import { Message } from 'node-nats-streaming';
import {
  Subjects,
  queueGroupNames,
  IAccountUpdatedEvent,
} from '@tusks/api/util-interfaces';
import { Listener } from '@tusks/api/shared-services';
import { User } from '../../models/User';

export class AccountUpdatedListener extends Listener<IAccountUpdatedEvent> {
  readonly subject: Subjects.AccountUpdated = Subjects.AccountUpdated;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async onMessage(data: IAccountUpdatedEvent['data'], msg: Message) {
    console.log('Event data ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.id },
      {
        $set: {
          account: { ...data },
        },
      }
    );

    await user!?.save();

    msg.ack();
  }
}
