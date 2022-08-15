import { authMiddleware } from '@tusks/api/shared-middleware';
import { errorService } from '@tusks/api/shared-services';
import { Router } from 'express';

import { paymentController } from '../controllers';
import { emailMiddleware } from '../middleware';

const router = Router();

router.post(
  '/',
  emailMiddleware.checkRequiredBodyFields,
  emailMiddleware.validateRequestBodyFields,
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(paymentController.sendEmail)
);

export { router as emailRoutes };
