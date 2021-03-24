import { Router } from 'express';
import { errorMsgs } from '../services/error-handler';
import { test } from '../modules';

const router = Router();

router.use('/test', test.controllers);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(errorMsgs.PAGE_NOT_FOUND());
});

export default router;
