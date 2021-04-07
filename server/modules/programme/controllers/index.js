import { Router } from 'express';

import getProgrammeById from './get-programme-by-id';
import getProgrammes from './get-programmes';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getProgrammeById);
router.get('/', authenticate(), getProgrammes);

export default router;
