import { Router } from 'express';
import { listController } from '../controllers/lists';
import { listMiddleware } from '../middleware/lists';
import { boardMiddleware } from '../middleware';
import { authMiddleware } from '@tusks/api/shared-middleware';
import { errorService } from '@tusks/api/shared-services';
import { ROLES } from '@tusks/api/util-interfaces';

const router = Router();

router.get(
  '/all/:boardId',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(listController.getList)
);

router
  .route('/:boardId/:listId')
  .get(
    authMiddleware.validateRequiredAccessJwt,
    authMiddleware.checkIsAuthenticated,
    errorService.catchAsyncError(listController.getListById)
  )
  .patch(
    listMiddleware.checkRequiredBodyFields,
    listMiddleware.validateRequestBodyFields,
    authMiddleware.validateRequiredAccessJwt,
    authMiddleware.checkIsAuthenticated,
    boardMiddleware.verifyAccessPermission(ROLES.EDITOR),
    errorService.catchAsyncError(listController.updateList)
  )
  .delete(
    authMiddleware.validateRequiredAccessJwt,
    authMiddleware.checkIsAuthenticated,
    errorService.catchAsyncError(listController.deleteList)
  );

router.patch(
  '/move',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(listController.moveList)
);

router.post(
  '/create/:boardId',
  listMiddleware.checkRequiredBodyFields,
  listMiddleware.validateRequestBodyFields,
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(listController.createList)
);

export { router as listRoutes };
