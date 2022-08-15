import { Message } from 'node-nats-streaming';
import {
  Subjects,
  queueGroupNames,
  IBoardViewedEvent,
} from '@tusks/api/util-interfaces';
import { User } from '../../models/User';
import { Listener } from '@tusks/api/shared-services';

export class BoardViewedListener extends Listener<IBoardViewedEvent> {
  readonly subject: Subjects.BoardViewed = Subjects.BoardViewed;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async onMessage(data: IBoardViewedEvent['data'], msg: Message) {
    const user = await User.findOneAndUpdate(
      { _id: data.userId },
      { $push: { viewedRecent: { $each: [data.boardId] } } }
    );

    if (user) {
      await user!?.save();
    }

    msg.ack();
  }
}
