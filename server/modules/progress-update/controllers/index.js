import { Router } from 'express';

import getProgressUpdateById from './get-progress-update-by-id';
import createProgressUpdate from './create-progress-update';
import updateProgressUpdate from './update-progress-update';

import { csrfProtection, authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getProgressUpdateById);
router.post('/', authenticate(), csrfProtection, createProgressUpdate);
router.patch('/:id', authenticate(), csrfProtection, updateProgressUpdate);

export default router;
