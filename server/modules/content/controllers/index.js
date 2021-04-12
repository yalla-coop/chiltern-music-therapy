import { Router } from 'express';

import getContentById from './get-content-by-id';
import getLibraryContent from './get-library-content';
import getCategories from './get-categories';
import getContentByProg from './get-content-by-prog';
import deleteContent from './delete-content';
import removeContentFromLibrary from './remove-content-from-library';
import editContent from './edit-content';
import removeContentFromProgramme from './remove-content-from-programme';

import { userRoles } from '../../../constants/data-type';

import { authenticate, authorize } from '../../../api/middlewares';

const router = Router();

router.get('/library', authenticate(), getLibraryContent);
router.get('/categories', authenticate(), getCategories);
router.get('/programmes/:id', authenticate(), getContentByProg);
router.get('/:id', authenticate(), getContentById);
router.post(
  '/remove-from-library',
  authenticate(),
  authorize([userRoles.ADMIN, userRoles.SUPER_ADMIN, userRoles.THERAPIST]),
  removeContentFromLibrary,
);
router.post(
  '/edit-content',
  authenticate(),
  authorize([userRoles.ADMIN, userRoles.SUPER_ADMIN, userRoles.THERAPIST]),
  editContent,
);
router.delete(
  '/',
  authenticate(),
  authorize([userRoles.ADMIN, userRoles.SUPER_ADMIN, userRoles.THERAPIST]),
  deleteContent,
);
router.delete(
  '/remove-from-programme',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  removeContentFromProgramme,
);

export default router;
