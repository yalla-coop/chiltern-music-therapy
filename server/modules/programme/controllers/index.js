import { Router } from 'express';

import getProgrammeById from './get-programme-by-id';
import getProgrammesByClient from './get-programmes-by-client';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getProgrammeById);
router.get('/', authenticate(), getProgrammesByClient);

export default router;
