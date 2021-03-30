import { Router } from 'express';

import getOrganisationById from './get-organisation-by-id';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getOrganisationById);

export default router;
