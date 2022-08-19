import app from './app'
import { BadRequestError, Database } from '@tusks/api/shared-services'
import NatsClient from './services/nats-client'

class Server {
  private static validateEnvVariables() {
    const {
      PORT,
      MONGO_URI,
      NATS_URL,
      NATS_CLIENT_ID,
      NATS_CLUSTER_ID,
      SPOTIFY_REDIRECT_URI,
      SPOTIFY_SECRET,
      SPOTIFY_ID,
    } = process.env

    if (
      !PORT ||
      !MONGO_URI ||
      !NATS_CLUSTER_ID ||
      !NATS_CLIENT_ID ||
      !NATS_URL ||
      !SPOTIFY_ID ||
      !SPOTIFY_REDIRECT_URI ||
      !SPOTIFY_SECRET
    ) {
      throw new BadRequestError('Some Env variables are missing!')
    }
  }

  async start() {
    Server.validateEnvVariables()

    const { NODE_ENV, PORT = '3000' } = process.env

    const port = parseInt(PORT!, 10)

    await NatsClient.listen()

    await Database.connect({ dbName: 'accounts', uri: process.env.MONGO_URI })
    app.listen(port, () => {
      const serverStatus = [
        {
          '[ACS] Server Status': 'Online',
          Environment: NODE_ENV!,
          Port: port,
        },
      ]
      console.table(serverStatus)
    })
  }
}

const server = new Server()

server.start()
