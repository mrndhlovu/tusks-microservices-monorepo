import { NextFunction, Request, Response } from 'express';
import { check, oneOf, validationResult } from 'express-validator';

import { allowedCardUpdateFields } from '../utils/constants';
import { CardDocument } from '../models/Card';
import {
  errorService,
  RequestValidationError,
} from '@tusks/api/shared-services';

const { catchAsyncError } = errorService;

declare global {
  namespace Express {
    interface Request {
      card: CardDocument | null | undefined;
    }
  }
}

class CardMiddleware {
  checkRequiredBodyFields = [
    oneOf(
      allowedCardUpdateFields.map((field: string) =>
        check(field).exists().trim().withMessage(`${field} is required.`)
      )
    ),
  ];

  validateRequestBodyFields = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      next();
    }
  );
}

export const cardMiddleware = new CardMiddleware();
