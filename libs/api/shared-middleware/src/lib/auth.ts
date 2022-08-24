import { Response, NextFunction, Request } from 'express'
import { validationResult } from 'express-validator'
import * as jwt from 'jsonwebtoken'
import { IJwtAccessTokens, IJwtAuthToken } from '@tusks/api/util-interfaces'
import {
  errorService,
  NotAuthorisedError,
  RequestValidationError,
} from '@tusks/api/shared-services'

const { catchAsyncError } = errorService

declare global {
  namespace Express {
    interface Request {
      currentUserJwt: IJwtAuthToken
      apolloAuthToken: string
      session?: {
        jwt: IJwtAccessTokens
        httpOnly?: boolean
        domain?: string
        sameSite?: boolean
        signed?: boolean
      } | null
    }
  }
}

class AuthMiddleWare {
  checkIsAuthenticated = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req?.get('Authorization')!?.replace('Bearer ', '')
      const authorizationToken =
        authorization !== '' ? authorization : undefined

      if (req?.currentUserJwt?.userId) {
        next()
      }
      const sessionJwtToken =
        req.session && req?.session!.jwt?.access
          ? req?.session!.jwt?.access
          : authorizationToken

      if (!sessionJwtToken) {
        req.session = null
        throw new NotAuthorisedError('Authorization credentials are missing.')
      }

      const currentUserJwt = jwt.verify(
        sessionJwtToken,
        process.env.JWT_ACCESS_TOKEN_SIGNATURE!
      )

      req.currentUserJwt = currentUserJwt as IJwtAuthToken

      next()
    }
  )

  validateRequestBodyFields = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
      }

      next()
    }
  )

  validateRequiredAccessJwt = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.session || !req.session.jwt) {
        throw new NotAuthorisedError('Authorization credentials are missing.')
      }

      next()
    }
  )

  validateRequiredRefreshJwt = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      if (!req.session || !req.session.jwt?.refresh) {
        throw new NotAuthorisedError('Authorization credentials are missing.')
      }

      const currentUserJwt = jwt.verify(
        req.session.jwt.refresh,
        process.env.JWT_REFRESH_TOKEN_SIGNATURE!
      )

      req.currentUserJwt = currentUserJwt as IJwtAuthToken

      next()
    }
  )
}

export const authMiddleware = new AuthMiddleWare()
