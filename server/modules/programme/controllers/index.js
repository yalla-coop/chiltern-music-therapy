import { Router } from 'express';

import getProgrammeById from './get-programme-by-id';
import createProgramme from './create-programme';
import updateProgramme from './update-programme';
import getProgrammes from './get-programmes';

import { authenticate, authorize } from '../../../api/middlewares';

const router = Router();

// todo add   authorize([userRoles.THERAPIST]),
router.get('/:id', authenticate(), getProgrammeById);
router.post('/create', authenticate(), createProgramme);
router.patch('/update', authenticate(), updateProgramme);
router.get('/', authenticate(), getProgrammes);

export default router;
