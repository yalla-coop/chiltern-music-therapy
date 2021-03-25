import { Router } from 'express';

import getTest from './get-test';

const router = Router();

router.get('/', getTest);

export default router;
