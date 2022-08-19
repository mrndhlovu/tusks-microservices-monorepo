import app from './app'
import { SendEmailListener } from './events/listeners'
import { BadRequestError, natsService } from '@tusks/api/shared-services'

class Server {
  private loadEnvVariables() {
    const {
      NATS_CLIENT_ID,
      NATS_CLUSTER_ID,
      NATS_URL,
      MONGO_URI,
      PORT,
      MAILGUN_SECRET_KEY,
    } = process.env

    if (
      !NATS_CLIENT_ID ||
      !NATS_CLUSTER_ID ||
      !NATS_URL ||
      !MONGO_URI ||
      !PORT ||
      !MAILGUN_SECRET_KEY
    ) {
      throw new BadRequestError('Some Env variables are missing!')
    }
  }

  private async connectEventBus() {
    const { NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } = process.env
    await natsService.connect(NATS_CLUSTER_ID!, NATS_CLIENT_ID!, NATS_URL!)
    natsService.handleDisconnection()

    new SendEmailListener(natsService.client).listen()
  }

  async start() {
    this.loadEnvVariables()

    const { NODE_ENV, PORT } = process.env

    const port = 3000 //parseInt(PORT!, 10);

    await this.connectEventBus()

    app.listen(port, () => {
      const serverStatus = [
        {
          '[ES] Server Status': 'Online',
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
