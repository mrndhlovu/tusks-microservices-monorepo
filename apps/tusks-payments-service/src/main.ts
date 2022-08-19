import app from './app';
import NatsClient from './services/nats-client';
import { BadRequestError, Database } from '@tusks/api/shared-services';

class Server {
  private static validateEnvVariables() {
    const {
      NATS_CLIENT_ID,
      NATS_CLUSTER_ID,
      NATS_URL,
      MONGO_URI,
      PORT,
      STRIPE_SECRET_KEY,
    } = process.env;

    if (
      !NATS_CLIENT_ID ||
      !NATS_CLUSTER_ID ||
      !NATS_URL ||
      !MONGO_URI ||
      !PORT ||
      !STRIPE_SECRET_KEY
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  static async start() {
    Server.validateEnvVariables();

    const { NODE_ENV, PORT } = process.env;

    const port = 5004; //parseInt(PORT!, 10);

    // await NatsClient.listen();

    await Database.connect({ dbName: 'payments', uri: process.env.MONGO_URI! });

    app.listen(port, () => {
      const serverStatus = [
        {
          '[PS] Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ];
      console.table(serverStatus);
    });
  }
}

Server.start();
