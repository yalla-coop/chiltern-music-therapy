import { Router } from 'express';

import getMediaById from './get-media-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getMediaById);

export default router;
