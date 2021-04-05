import { Router } from 'express';

import getTherapistClientById from './get-therapist-client-by-id';
import getTherapistByInviteToken from './get-therapist-by-invite-token';
import getClientById from './get-client-by-id';
import { userRoles } from '../../../constants';

import { authenticate, authorize } from '../../../api/middlewares';

const router = Router();

router.get('/token/:token', getTherapistByInviteToken);
router.get(
  '/client/:id',
  authenticate(),
  authorize([userRoles.THERAPIST]),
  getClientById,
);
router.get('/:id', authenticate(), getTherapistClientById);

export default router;
