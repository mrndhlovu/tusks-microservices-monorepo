import { natsService } from '@tusks/api/shared-services';
import {
  AccountDeletedListener,
  AccountUpdatedListener,
} from '../events/listeners';

class NatsClient {
  static async listen() {
    const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = process.env;
    await natsService.connect(NATS_CLUSTER_ID!, NATS_CLIENT_ID!, NATS_URL!);
    natsService.handleDisconnection();

    new AccountUpdatedListener(natsService.client).listen();
    new AccountDeletedListener(natsService.client).listen();
  }
}

export default NatsClient;
