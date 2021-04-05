import { Router } from 'express';

import getTherapistClientById from './get-therapist-client-by-id';
import getMyTherapist from './get-my-therapist';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/my-therapist', /* authenticate(), */ getMyTherapist);
router.get('/:id', authenticate(), getTherapistClientById);

export default router;
