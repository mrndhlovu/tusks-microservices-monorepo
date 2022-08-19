import { NextFunction, Request, Response } from 'express';
import { check, oneOf, validationResult } from 'express-validator';
import { IPaymentDocument } from '../models/Payment';
import {
  REQUIRED_CHARGE_FIELDS,
  REQUIRED_ORDER_FIELDS,
} from '../utils/constants';
import { paymentService } from '../services/payment';
import { IOrderDocument } from '../models/Order';
import {
  BadRequestError,
  errorService,
  RequestValidationError,
} from '@tusks/api/shared-services';

const { catchAsyncError } = errorService;

declare global {
  namespace Express {
    interface Request {
      payment: IPaymentDocument | null | undefined;
      order: IOrderDocument | null | undefined;
    }
  }
}

class PaymentMiddleware {
  checkREQUIRED_CHARGE_FIELDS = [
    oneOf(
      REQUIRED_CHARGE_FIELDS.map((field: string) =>
        check(field)
          .exists()
          .not()
          .isEmpty()
          .withMessage(`${field} is required.`)
      )
    ),
  ];

  checkREQUIRED_ORDER_FIELDS = [
    oneOf(
      REQUIRED_ORDER_FIELDS.map((field: string) =>
        check(field)
          .exists()
          .not()
          .isEmpty()
          .withMessage(`${field} is required.`)
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

  checkOrderExists = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      const { orderId } = req.params;

      if (!orderId) throw new BadRequestError('Order id is required');
      const order = await paymentService.findOrderById(orderId);

      if (!order) throw new BadRequestError('Order not found.');

      req.order = order;

      next();
    }
  );

  checkOrderIsNotPaid = catchAsyncError(
    async (req: Request, _res: Response, next: NextFunction) => {
      if (req.order!.isPaid)
        throw new BadRequestError('You cannot delete a paid order.');

      next();
    }
  );
}

export const paymentMiddleware = new PaymentMiddleware();
