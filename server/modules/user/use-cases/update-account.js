import Boom from '@hapi/boom';

import * as User from '../model';

import { errorMsgs } from '../../../services/error-handler';

import { userRoles as roles } from '../../../constants';

const updateAccount = async ({ accountData, id, role }) => {
  // for both
  const { email, firstName, lastName } = accountData;

  // for therapist only
  const {
    bio,
    contactNumber,
    contactEmail,
    profileImg: profilePhotoMediaId,
  } = accountData;

  const user = await User.findUserByEmail(email);
  if (user && user.id !== id) {
    throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
  }

  switch (role) {
    case roles.CLIENT:
      return User.updateClientAccount({
        email,
        firstName,
        lastName,
        id,
      });
    case roles.THERAPIST:
      return User.updateTherapistAccount({
        email,
        firstName,
        lastName,
        bio,
        contactNumber,
        contactEmail,
        profilePhotoMediaId,
        id,
      });
    default:
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
  }
};

export default updateAccount;
