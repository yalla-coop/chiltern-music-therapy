import Boom from '@hapi/boom';
import * as User from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { verifyPassword } from '../../../helpers';
import { userRoles } from '../../../constants';
import checkTherapistProfile from './check-therapist-profile';

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

  if (userWithSameEmail.roles[0] === userRoles.THERAPIST) {
    const hasProfile = await checkTherapistProfile({
      id: userWithSameEmail.id,
    });
    userWithSameEmail.hasProfile = hasProfile;
  }

  userWithSameEmail.password = null;
  return userWithSameEmail;
};

export default login;
