import { Router } from 'express';

import getViewAccessById from './get-view-access-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getViewAccessById);

export default router;
