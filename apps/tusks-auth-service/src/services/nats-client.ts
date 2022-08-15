import { natsService } from '@tusks/api/shared-services';
import {
  BoardCreatedListener,
  BoardDeletedListener,
  AccountUpdatedListener,
  NewActionListener,
  BoardViewedListener,
  WorkspaceCreatedListener,
} from '../events/listeners';

class NatsClient {
  static async listen() {
    await natsService.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );

    natsService.handleDisconnection();

    new BoardCreatedListener(natsService.client).listen();
    new BoardDeletedListener(natsService.client).listen();
    new AccountUpdatedListener(natsService.client).listen();
    new BoardViewedListener(natsService.client).listen();
    new NewActionListener(natsService.client).listen();
    new WorkspaceCreatedListener(natsService.client).listen();
  }
}

export default NatsClient;
