import { Router } from 'express';

import getTherapistClientById from './get-therapist-client-by-id';
import getMyTherapist from './get-my-therapist';
import getTherapistByInviteToken from './get-therapist-by-invite-token';
import getClientById from './get-client-by-id';
import { userRoles } from '../../../constants';
import getMyTherapy from './get-my-therapy';
import editTherapistClientById from './edit-therapist-client-by-id';
import createTherapistClient from './create-therapist-client';

import {
  csrfProtection,
  authenticate,
  authorize,
} from '../../../api/middlewares';

const router = Router();

router.get('/my-therapist', authenticate(), getMyTherapist);
router.get('/token/:token', getTherapistByInviteToken);
router.get(
  '/client/:id',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  getClientById,
);
router.get('/my-therapy', authenticate(), getMyTherapy);
router.get('/:id', authenticate(), getTherapistClientById);
router.patch(
  '/',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  csrfProtection,
  editTherapistClientById,
);
router.post(
  '/client',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  csrfProtection,
  createTherapistClient,
);

export default router;
