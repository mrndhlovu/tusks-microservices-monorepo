import { Listener } from '@tusks/api/shared-services';
import {
  IUserDeletedEvent,
  queueGroupNames,
  Subjects,
} from '@tusks/api/util-interfaces';
import { Message } from 'node-nats-streaming';
import Board from '../../models/Board';

export class UserDeletedListener extends Listener<IUserDeletedEvent> {
  readonly subject: Subjects.UserDeleted = Subjects.UserDeleted;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async onMessage(data: IUserDeletedEvent['data'], msg: Message) {
    console.log('Event data ', data);

    await Board.deleteMany({
      _id: data.boardIds,
      owner: data?.id,
    });

    msg.ack();
  }
}
