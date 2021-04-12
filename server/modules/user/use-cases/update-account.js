import Boom from '@hapi/boom';

import * as User from '../model';
import * as Media from '../../media/use-cases';

import { errorMsgs } from '../../../services/error-handler';

import { userRoles as roles } from '../../../constants';

const updateAccount = async ({ accountData, id, role }) => {
  // for both
  const { email, firstName, lastName, profilePhotoMediaId } = accountData;

  // for therapist only
  const { bio, contactNumber, contactEmail, uploadedFileInfo } = accountData;

  const user = await User.findUserByEmail(email);
  if (user && user.id !== id) {
    throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
  }
  let profileImageMedia;

  switch (role) {
    case roles.CLIENT:
      return User.updateClientAccount({
        email,
        firstName: firstName[0],
        lastName: lastName[0],
        id,
      });
    case roles.THERAPIST:
      // store uploaded image info

      if (uploadedFileInfo && uploadedFileInfo.uploadedToS3) {
        const {
          name,
          key,
          bucket,
          bucketRegion,
          size,
          fileType,
        } = uploadedFileInfo;

        profileImageMedia = await Media.updateMediaById({
          id: profilePhotoMediaId,
          fileName: name,
          fileType,
          size,
          key,
          bucket,
          bucketRegion,
          createdBy: user.id,
        });
      }

      return User.updateTherapistAccount({
        email,
        firstName,
        lastName,
        bio,
        contactNumber,
        contactEmail,
        profilePhotoMediaId: profileImageMedia
          ? profileImageMedia.id
          : profilePhotoMediaId,
        id,
      });
    default:
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
  }
};

export default updateAccount;
