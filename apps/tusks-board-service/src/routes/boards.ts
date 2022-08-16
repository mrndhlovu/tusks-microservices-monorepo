import { authMiddleware } from '@tusks/api/shared-middleware';
import { errorService } from '@tusks/api/shared-services';
import { ROLES } from '@tusks/api/util-interfaces';
import { Router } from 'express';
import multer from 'multer';
import { boardController } from '../controllers';
import { boardMiddleware } from '../middleware';

const router = Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get(
  '/unsplash/images',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.getUnsplashImages)
);

router.get(
  '/',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.getBoardList)
);

router.get(
  '/templates',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.getBoardTemplates)
);

router.get(
  '/workspaces',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.getWorkspaces)
);

router.patch(
  '/:workspaceId/update-workspace',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.updateWorkspace)
);

router.delete(
  '/:workspaceId/del-workspace',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.deleteWorkspace)
);

router.get(
  '/workspace',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.getWorkspaceById)
);

router.get(
  '/search',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.search)
);

router.get(
  '/:boardId/attachments',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.getAttachmentsByBoardId)
);

router.delete(
  '/:attachmentId/del-attachment',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.deleteAttachment)
);

router
  .route('/:boardId')
  .get(
    authMiddleware.validateRequiredAccessJwt,
    authMiddleware.checkIsAuthenticated,
    boardMiddleware.verifyAccessPermission(ROLES.OBSERVER),
    errorService.catchAsyncError(boardController.getBoardById)
  )
  .patch(
    boardMiddleware.checkRequiredBodyFields,
    boardMiddleware.validateRequestBodyFields,
    authMiddleware.validateRequiredAccessJwt,
    authMiddleware.checkIsAuthenticated,
    boardMiddleware.verifyAccessPermission(ROLES.EDITOR),
    errorService.catchAsyncError(boardController.updateBoard)
  )
  .delete(
    authMiddleware.validateRequiredAccessJwt,
    authMiddleware.checkIsAuthenticated,
    boardMiddleware.verifyAccessPermission(ROLES.OWNER),
    errorService.catchAsyncError(boardController.deleteBoard)
  );

router.post(
  '/create',
  boardMiddleware.checkRequiredBodyFields,
  boardMiddleware.validateRequestBodyFields,
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.createBoard)
);

router.post(
  '/new-workspace',
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.createWorkspace)
);

router.post(
  '/upload/:boardId/add-cover',
  upload.array('file', 10),
  boardMiddleware.serializeUpload,
  authMiddleware.validateRequiredAccessJwt,
  authMiddleware.checkIsAuthenticated,
  errorService.catchAsyncError(boardController.uploadBgImage)
);

export { router as boardRoutes };
