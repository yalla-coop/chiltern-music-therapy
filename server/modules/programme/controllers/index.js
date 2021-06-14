import { Router } from 'express';

import getProgrammeById from './get-programme-by-id';
import createProgramme from './create-programme';
import updateProgramme from './update-programme';
import getProgrammes from './get-programmes';
import createProgrammeFeedback from './create-programme-feedback';

import {
  authenticate,
  authorize,
  csrfProtection,
} from '../../../api/middlewares';
import { userRoles } from '../../../constants/data-type';

const router = Router();

router.get('/:id', authenticate(), getProgrammeById);
router.post(
  '/:id/feedback',
  authenticate(),
  csrfProtection,
  createProgrammeFeedback,
);
router.post(
  '/create',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  csrfProtection,
  createProgramme,
);
router.patch(
  '/update',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  csrfProtection,
  updateProgramme,
);
router.get('/', authenticate(), getProgrammes);

export default router;
