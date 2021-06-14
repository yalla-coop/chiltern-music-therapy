import { Router } from 'express';

import signup from './signup';
import login from './login';
import logout from './logout';
import deleteUser from './delete-user';
import getUserInfo from './get-user-info';
import getUserDashboard from './get-user-dashboard';
import resetPasswordLink from './reset-password-link';
import updatePassword from './update-password';
import {
  authenticate,
  authorize,
  createCSRFToken,
  csrfProtection,
} from '../../../api/middlewares';
import getTherapists from './get-therapists';
import updateAccount from './update-account';
import getAccountInfo from './get-account-info';
import checkUserExists from './check-user-exists';
import createTherapistProfile from './create-therapist-profile';
import getCSRFToken from './get-csrf-token';

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
router.post('/check-user-exists', csrfProtection, checkUserExists);
router.post('/signup', csrfProtection, signup);
router.post('/login', csrfProtection, login);
router.post('/logout', csrfProtection, logout);
router.post('/reset-password-link', csrfProtection, resetPasswordLink);
router.post('/update-password', csrfProtection, updatePassword);
router.post('/profile', authenticate(), csrfProtection, createTherapistProfile);
router.patch('/account', authenticate(), csrfProtection, updateAccount);
router.delete('/', authenticate(), csrfProtection, deleteUser);
router.get('/get-csrf-token', createCSRFToken, getCSRFToken);

export default router;
