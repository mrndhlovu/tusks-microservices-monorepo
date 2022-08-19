import { Message } from 'node-nats-streaming'
import { Listener, natsService } from '@tusks/api/shared-services'
import {
  IUserDeletedEvent,
  queueGroupNames,
  Subjects,
} from '@tusks/api/util-interfaces'

import Account from '../../models/Account'
import { AccountDeletedPublisher } from '../publishers'

export class UserDeletedListener extends Listener<IUserDeletedEvent> {
  readonly subject: Subjects.UserDeleted = Subjects.UserDeleted
  queueGroupName = queueGroupNames.ACCOUNT_QUEUE_GROUP

  onMessage = async (data: IUserDeletedEvent['data'], msg: Message) => {
    console.log('Event data ', data)

    try {
      const account = await Account.findOne({ _id: data.id })

      if (account) {
        const eventData = { email: data.email, userId: account._id }

        await account.delete()

        new AccountDeletedPublisher(natsService.client).publish(eventData)
      }

      msg.ack()
    } catch (error) {
      return error
    }
  }
}
