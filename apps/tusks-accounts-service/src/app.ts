import 'express-async-errors'
import * as cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import * as express from 'express'

import { accountRoutes } from './routes'
import { spotifyRoutes } from './routes/spotify'
import { errorService } from '@tusks/api/shared-services'

const secure =
  process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development'
const app = express.default()

app.set('trust proxy', true)

app.use(cookieParser.default())
app.use(express.json())
app.use(cookieSession({ signed: false, secure }))
app.use(express.urlencoded({ extended: false }))
app.use('/api/accounts', accountRoutes)

app.use('/api/accounts/powerups/spotify', spotifyRoutes)

app.all('*', errorService.handleNotFoundError)
app.use(errorService.errorHandler)

export default app
