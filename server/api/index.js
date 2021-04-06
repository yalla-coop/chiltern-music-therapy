import { Router } from 'express';
import { errorMsgs } from '../services/error-handler';
import {
  content,
  media,
  organisation,
  programme,
  progressUpdate,
  therapistClient,
  user,
  viewAccess,
} from '../modules';

const router = Router();

router.use('/contents', content.controllers);
router.use('/media', media.controllers);
router.use('/organisations', organisation.controllers);
router.use('/programmes', programme.controllers);
router.use('/progress-updates', progressUpdate.controllers);
router.use('/therapist-clients', therapistClient.controllers);
router.use('/users', user.controllers);
router.use('/view-accesses', viewAccess.controllers);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(errorMsgs.NOT_FOUND);
});

export default router;
