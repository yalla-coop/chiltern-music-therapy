import { Router } from 'express';

import getTherapistClientById from './get-therapist-client-by-id';
import getTherapistByInviteToken from './get-therapist-by-invite-token';
import getMyTherapy from './get-my-therapy';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/token/:token', getTherapistByInviteToken);
router.get('/my-therapy', authenticate(), getMyTherapy);
router.get('/:id', authenticate(), getTherapistClientById);

export default router;
