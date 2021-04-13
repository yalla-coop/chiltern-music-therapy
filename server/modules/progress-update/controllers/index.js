import { Router } from 'express';

import getProgressUpdateById from './get-progress-update-by-id';
import createProgressUpdate from './create-progress-update';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getProgressUpdateById);
router.post('/', authenticate(), createProgressUpdate);

export default router;
