import * as nats from 'node-nats-streaming';

class NatsService {
  private _client?: nats.Stan;

  get client() {
    if (!this._client)
      throw new Error('[AS] Cannot access NATS client before connecting');
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client!.on('connect', () => {
        console.log('[AS] Connected to NATS service.');
        resolve();
      });

      this.client?.on('error', (err) => {
        reject(err);
      });
    });
  }

  disconnect() {
    natsService.client.on('close', () => {
      console.log('[AS] NATS process closed');
      process.exit();
    });

    process.on('SIGINT', () => natsService.client.close());
    process.on('SIGTERM', () => natsService.client.close());
  }
}
export const natsService = new NatsService();
