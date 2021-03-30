import { Router } from 'express';

import getProgrammeById from './get-programme-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getProgrammeById);

export default router;
