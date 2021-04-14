import Boom from '@hapi/boom';
import * as User from '../model';
import { hashPassword } from '../../../helpers';
import { errorMsgs } from '../../../services/error-handler';
import { validateSignup } from '../utils';
import { userRoles, userStatuses } from '../../../constants';

const therapistSignup = async ({ email, password, firstName, lastName }) => {
  await validateSignup({
    email,
    password,
    firstName,
    lastName,
    role: userRoles.THERAPIST,
  });

  const userWithSameEmail = await User.findUserByEmail(email);
  if (userWithSameEmail) {
    throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.createUser({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    roles: [userRoles.THERAPIST],
    status: userStatuses.ACTIVE,
  });

  return user;
};

export default therapistSignup;
