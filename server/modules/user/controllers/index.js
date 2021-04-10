import { Router } from 'express';

import signup from './signup';
import login from './login';
import logout from './logout';
import deleteUser from './delete-user';
import getUserInfo from './get-user-info';
import getUserDashboard from './get-user-dashboard';
import resetPasswordLink from './reset-password-link';
import updatePassword from './update-password';
import { authenticate, authorize } from '../../../api/middlewares';
import getTherapists from './get-therapists';
import updateAccount from './update-account';
import getAccountInfo from './get-account-info';

import { userRoles } from '../../../constants/data-type';

const router = Router();

router.get('/my-info', authenticate(), getUserInfo);
router.get('/dashboard', authenticate(), getUserDashboard);
router.get(
  '/therapists',
  authenticate(),
  authorize([userRoles.ADMIN, userRoles.SUPER_ADMIN]),
  getTherapists,
);
router.get('/my-account', authenticate(), getAccountInfo);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password-link', resetPasswordLink);
router.post('/update-password', updatePassword);
router.post('/update-account', authenticate(), updateAccount);
router.delete('/', authenticate(), deleteUser);

export default router;
