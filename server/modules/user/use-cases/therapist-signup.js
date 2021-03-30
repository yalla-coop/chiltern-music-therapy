import Boom from '@hapi/boom';
import * as User from '../model';
import { hashPassword } from '../../../helpers';
import { errorMsgs } from '../../../services/error-handler';
import { validateSignup } from '../utils';

const therapistSignup = async ({ email, password }) => {
  await validateSignup({
    email,
    password,
  });

  const userWithSameEmail = await User.findUserByEmail(email);
  if (userWithSameEmail) {
    throw Boom.conflict(errorMsgs.EMAIL_ALREADY_USED, { field: 'email' });
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.createUser({
    email,
    password: hashedPassword,
  });

  return user;
};

export default therapistSignup;
