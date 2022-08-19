import { NextFunction, Request, Response } from 'express'
import { check, oneOf, validationResult } from 'express-validator'
import * as jwt from 'jsonwebtoken'

import { accountService } from '../services/account'
import { ALLOWED_ACCOUNT_UPDATE_FIELDS } from '../utils/constants'
import { IAccountDocument } from '../models/Account'
import { IPowerUpDocument } from '../models/Powerup'
import { ISpotifyRequestOptions } from '../services/spotify'
import { IVerificationJwt } from '../types'
import {
  BadRequestError,
  errorService,
  RequestValidationError,
} from '@tusks/api/shared-services'
import { AccountStatus, IJwtAuthToken } from '@tusks/api/util-interfaces'

const { catchAsyncError } = errorService

declare global {
  namespace Express {
    interface Request {
      account: IAccountDocument | null | undefined
      currentUserJwt: IJwtAuthToken
      powerUp: IPowerUpDocument
      spotifyApiOptions: ISpotifyRequestOptions
    }
  }
}

class AccountMiddleware {
  checkRequiredBodyFields = [
    oneOf(
      ALLOWED_ACCOUNT_UPDATE_FIELDS.map((field: string) =>
        check(field).exists().trim().withMessage(`${field} is required.`)
      )
    ),
  ]

  validateRequestBodyFields = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
      }

      next()
    }
  )

  validateVerificationJwt = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const verificationJwt = jwt.verify(
        req.params.token,
        process.env.JWT_ACCESS_TOKEN_SIGNATURE!
      ) as IVerificationJwt

      const account = await accountService.findAccountOnlyByUseId(
        verificationJwt.userId
      )

      if (!account)
        throw new BadRequestError('Account with that userId was not found')

      accountService.validateAccountPlan(account)

      await account.save()

      req.account = account
      req.currentUserJwt = verificationJwt

      next()
    }
  )

  checkValidSpotifyPowerUp = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const powerUp = await accountService.findPowerUpByUseIdAndName(
        req.currentUserJwt.userId!,
        'spotify'
      )

      if (!powerUp || powerUp.status !== AccountStatus.Active)
        throw new BadRequestError('Account not linked with spotify')

      req.powerUp = powerUp
      req.spotifyApiOptions = {
        accessToken: powerUp.tokens.accessToken,
        powerUpId: powerUp._id.toString(),
        refreshToken: powerUp.tokens.refreshToken,
      }

      next()
    }
  )

  checkAccountPlan = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const account = await accountService.findAccountOnlyByUseId(
        req.currentUserJwt.userId!
      )

      if (!account)
        throw new BadRequestError('Account with that userId was not found')

      accountService.validateAccountPlan(account)

      await account.save()

      req.account = account

      next()
    }
  )
}

export const accountMiddleware = new AccountMiddleware()
