import { Router } from 'express';

import getMediaById from './get-media-by-id';
import getSignedURL from './get-signed-url';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/:id', authenticate(), getMediaById);
// TODO add auth
router.get('/', getSignedURL);

export default router;
