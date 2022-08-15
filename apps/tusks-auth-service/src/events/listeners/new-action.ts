import { Message } from 'node-nats-streaming';
import {
  Subjects,
  queueGroupNames,
  INewActionEvent,
} from '@tusks/api/util-interfaces';
import { natsService } from '../../services/nats';
import { User } from '../../models/User';
import { AuthedActionPublisher } from '../publishers/authed-action';
import { Listener } from '@tusks/api/shared-services';

export class NewActionListener extends Listener<INewActionEvent> {
  readonly subject: Subjects.NewAction = Subjects.NewAction;
  queueGroupName = queueGroupNames.AUTH_ACTION_QUEUE_GROUP;

  async onMessage(data: INewActionEvent['data'], msg: Message) {
    const user = await User.findById(data.userId);

    if (user) {
      new AuthedActionPublisher(natsService.client).publish({
        ...data,
        user: {
          id: user._id,
          initials: user.initials!,
          username: user?.username,
          fullName: user?.firstName
            ? `${user?.firstName} ${user?.lastName}`
            : ``,
        },
      });
    }

    msg.ack();
  }
}
