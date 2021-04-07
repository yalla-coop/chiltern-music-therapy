import { Router } from 'express';

import getContentById from './get-content-by-id';
import getLibraryContent from './get-library-content';
import getCategories from './get-categories';
import getContentByProg from './get-content-by-prog';

import { authenticate } from '../../../api/middlewares';

const router = Router();

router.get('/library', authenticate(), getLibraryContent);
router.get('/categories', authenticate(), getCategories);
router.get('/programmes/:id', authenticate(), getContentByProg);
router.get('/:id', authenticate(), getContentById);

export default router;
