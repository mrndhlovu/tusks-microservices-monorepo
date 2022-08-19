import { BadRequestError, Database } from '@tusks/api/shared-services';
import { app } from './app';
import NatsClient from './services/nats-client';

class Server {
  private static validateEnvVariables() {
    const {
      PORT,
      JWT_ACCESS_TOKEN_SIGNATURE,
      JWT_REFRESH_TOKEN_SIGNATURE,
      MONGO_URI,
      NATS_URL,
      NATS_CLIENT_ID,
      NATS_CLUSTER_ID,
      CLOUDINARY_API_SECRET,
      CLOUDINARY_API_KEY,
      CLOUDINARY_CLOUD_NAME,
      UNSPLASH_ACCESS_KEY,
      REGION_AWS,
      ACCESS_KEY_ID_AWS,
      SECRET_ACCESS_KEY_AWS,
      S3_BUCKET_AWS,
      ALGOLIA_APPLICATION_ID,
      ALGOLIA_ADMIN_API_KEY_ID,
    } = process.env;

    if (
      !PORT ||
      !JWT_ACCESS_TOKEN_SIGNATURE ||
      !JWT_REFRESH_TOKEN_SIGNATURE ||
      !MONGO_URI ||
      !NATS_CLUSTER_ID ||
      !NATS_CLIENT_ID ||
      !NATS_URL ||
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET ||
      !UNSPLASH_ACCESS_KEY ||
      !SECRET_ACCESS_KEY_AWS ||
      !ACCESS_KEY_ID_AWS ||
      !REGION_AWS ||
      !S3_BUCKET_AWS ||
      !ALGOLIA_ADMIN_API_KEY_ID ||
      !ALGOLIA_APPLICATION_ID
    ) {
      throw new BadRequestError('Some Env variables are missing!');
    }
  }

  static async start() {
    Server.validateEnvVariables();

    NatsClient.listen();
    const { NODE_ENV, PORT } = process.env;
    const port = 5003; //parseInt(PORT!, 10);

    await Database.connect({ uri: process.env.MONGO_URI, dbName: 'boards' });
    app.listen(port, () => {
      const serverStatus = [
        {
          'Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ];
      console.table(serverStatus);
    });
  }
}

Server.start();
