import { Router } from 'express';

import getContentById from './get-content-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getContentById);

export default router;
