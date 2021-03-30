import { Router } from 'express';

import getProgressUpdateById from './get-progress-update-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getProgressUpdateById);

export default router;
