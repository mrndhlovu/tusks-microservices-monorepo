import { natsService } from '@tusks/api/shared-services'
import {
  AuthActionListener,
  NotificationCreatedListener,
  PaymentCreatedListener,
  UserDeletedListener,
  UserVerifiedListener,
} from '../events/listeners'

class NatsClient {
  static async listen() {
    const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = process.env
    await natsService.connect(NATS_CLUSTER_ID!, NATS_CLIENT_ID!, NATS_URL!)
    natsService.handleDisconnection()

    new UserDeletedListener(natsService.client).listen()
    new UserVerifiedListener(natsService.client).listen()
    new PaymentCreatedListener(natsService.client).listen()
    new AuthActionListener(natsService.client).listen()
    new NotificationCreatedListener(natsService.client).listen()
  }
}

export default NatsClient
