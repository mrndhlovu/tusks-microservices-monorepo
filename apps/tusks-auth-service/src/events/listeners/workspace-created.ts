import { Message } from 'node-nats-streaming';
import {
  Subjects,
  queueGroupNames,
  IWorkspaceCreatedEvent,
} from '@tusks/api/util-interfaces';
import { User } from '../../models/User';
import { Listener } from '@tusks/api/shared-services';

export class WorkspaceCreatedListener extends Listener<IWorkspaceCreatedEvent> {
  readonly subject: Subjects.WorkspaceCreated = Subjects.WorkspaceCreated;
  queueGroupName = queueGroupNames.AUTH_QUEUE_GROUP;

  async onMessage(data: IWorkspaceCreatedEvent['data'], msg: Message) {
    console.log('Event data ', data);

    const user = await User.findOneAndUpdate(
      { _id: data.ownerId },
      {
        $push: {
          workspaces: data.id,
        },
      }
    );

    await user!?.save();

    msg.ack();
  }
}
