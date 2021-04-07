import { Router } from 'express';

import getContentById from './get-content-by-id';
import getContentByProg from './get-content-by-prog';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getContentById);
router.get('/programmes/:id', authenticate(), getContentByProg);

export default router;
