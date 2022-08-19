import { natsService } from '@tusks/api/shared-services';
import {
  CustomerCreatedListener,
  UserDeletedListener,
} from '../events/listeners';
import { AddBoardMemberListener } from '../events/listeners/add-board-member';

class NatsClient {
  static async listen() {
    const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = process.env;
    await natsService.connect(NATS_CLUSTER_ID!, NATS_CLIENT_ID!, NATS_URL!);
    natsService.handleDisconnection();

    new UserDeletedListener(natsService.client).listen();
    new CustomerCreatedListener(natsService.client).listen();
    new AddBoardMemberListener(natsService.client).listen();
  }
}

export default NatsClient;
