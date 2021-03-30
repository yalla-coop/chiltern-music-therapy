import { Router } from 'express';

import getTherapistClientById from './get-therapist-client-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getTherapistClientById);

export default router;
