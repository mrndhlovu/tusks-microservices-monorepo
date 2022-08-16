import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import * as express from 'express';

import { boardRoutes, cardRoutes, listRoutes } from './routes';
import { errorService } from '@tusks/api/shared-services';

const app = express.default();

const secure =
  process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development';

app.set('trust proxy', true);
app.use(cookieParser.default());
app.use(express.json());
app.use(cookieSession({ signed: false, secure }));
app.use(express.urlencoded({ extended: false }));
app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/lists', listRoutes);
app.all('*', errorService.handleNotFoundError);
app.use(errorService.errorHandler);

export { app };
