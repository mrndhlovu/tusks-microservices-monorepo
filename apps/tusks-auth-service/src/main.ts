import app from './app'
import { BadRequestError, Database } from '@tusks/api/shared-services'
import NatsClient from './services/nats-client'

class Server {
  private static validateEnvVariables() {
    const {
      PORT,
      JWT_ACCESS_TOKEN_SIGNATURE,
      JWT_REFRESH_TOKEN_SIGNATURE,
      JWT_OTP_TOKEN_SIGNATURE,
      MONGO_URI,
      NATS_URL,
      NATS_CLIENT_ID,
      NATS_CLUSTER_ID,
      TOTP_AUTHENTICATOR_SECRET,
    } = process.env

    if (
      !PORT ||
      !JWT_ACCESS_TOKEN_SIGNATURE ||
      !JWT_REFRESH_TOKEN_SIGNATURE ||
      !JWT_OTP_TOKEN_SIGNATURE ||
      !MONGO_URI ||
      !NATS_CLUSTER_ID ||
      !NATS_CLIENT_ID ||
      !NATS_URL ||
      !TOTP_AUTHENTICATOR_SECRET
    ) {
      throw new BadRequestError('Some Env variables are missing!')
    }
  }

  static async start() {
    Server.validateEnvVariables()

    await NatsClient.listen()

    const { NODE_ENV, PORT } = process.env

    const port = 3000 //parseInt(PORT!, 10);

    await Database.connect({ dbName: 'auth', uri: process.env.MONGO_URI })
    app.listen(port, () => {
      const serverStatus = [
        {
          'Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ]
      console.table(serverStatus)
    })
  }
}

Server.start()
