import { Router } from 'express';

import signup from './signup';
import login from './login';
import logout from './logout';
import deleteUser from './delete-user';
import getUserInfo from './get-user-info';
import getUserDashboard from './get-user-dashboard';
import { authenticate } from '../../../api/middlewares';
import resetPasswordLink from './reset-password-link';
import updatePassword from './update-password';

const router = Router();

router.get('/my-info', authenticate(), getUserInfo);
router.get('/dashboard', authenticate(), getUserDashboard);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password-link', resetPasswordLink);
router.post('/update-password', updatePassword);
router.delete('/', authenticate(), deleteUser);

export default router;
