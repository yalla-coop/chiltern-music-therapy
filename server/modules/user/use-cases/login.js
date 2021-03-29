import Boom from '@hapi/boom';
import * as User from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { verifyPassword } from '../../../helpers';

const login = async ({ email, password }) => {
  const userWithSameEmail = await User.findUserByEmail(email);
  if (!userWithSameEmail) {
    throw Boom.unauthorized(errorMsgs.INVALID_EMAIL_OR_PASSWORD);
  }

  const isPasswordValid = await verifyPassword(
    password,
    userWithSameEmail.password,
  );

  if (!isPasswordValid) {
    throw Boom.unauthorized(errorMsgs.INVALID_EMAIL_OR_PASSWORD);
  }

  userWithSameEmail.password = null;
  return userWithSameEmail;
};

export default login;
