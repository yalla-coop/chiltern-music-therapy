import { Router } from 'express';

import getContentById from './get-content-by-id';
import getLibraryContent from './get-library-content';
import getCategories from './get-categories';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/library', authenticate(), getLibraryContent);
router.get('/categories', authenticate(), getCategories);
router.get('/:id', authenticate(), getContentById);

export default router;
