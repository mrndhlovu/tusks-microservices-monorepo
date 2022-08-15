import { IDBConnectOptions } from '@tusks/api/util-interfaces';
import mongoose from 'mongoose';

export class Database {
  private static mongooseOptions = {
    useNewUrlParser: true,
    retryWrites: true,
  };

  static async connect({ uri, dbName }: IDBConnectOptions) {
    await mongoose
      .connect(uri, {
        ...Database.mongooseOptions,
        dbName,
      })
      .catch((err: Error) => {
        console.log(err.message);

        const dbStatus = [
          {
            'Database Status [AS]': 'Error',
          },
        ];
        console.table(dbStatus);
      });
  }
}
