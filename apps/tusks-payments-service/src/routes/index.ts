import { authMiddleware } from '@tusks/api/shared-middleware';
import { errorService } from '@tusks/api/shared-services';
import { Router } from 'express';
import { paymentController } from '../controllers';
import { paymentMiddleware } from '../middleware';

const router = Router();

router.get(
  '/order/:orderId',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  paymentMiddleware.checkOrderExists,
  errorService.catchAsyncError(paymentController.getOrderById)
);

router.get(
  '/',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(paymentController.getPayments)
);

router.get(
  '/products',
  errorService.catchAsyncError(paymentController.getStripeProductsPriceList)
);

router.post(
  '/create',
  paymentMiddleware.checkREQUIRED_ORDER_FIELDS,
  paymentMiddleware.validateRequestBodyFields,
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(paymentController.createOrder)
);

router.post(
  '/subscription',
  paymentMiddleware.checkREQUIRED_ORDER_FIELDS,
  paymentMiddleware.validateRequestBodyFields,
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(paymentController.createSubscription)
);

router.delete(
  '/delete/:orderId',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  paymentMiddleware.checkOrderExists,
  paymentMiddleware.checkOrderIsNotPaid,
  errorService.catchAsyncError(paymentController.deleteOrder)
);

export { router as paymentRoutes };
