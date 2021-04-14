import * as User from '../model';
import * as Media from '../../media/model';

import { getClient } from '../../../database/connect';

const createTherapistProfile = async ({ accountData, id }) => {
  const { bio, contactNumber, contactEmail, uploadedFileInfo } = accountData;
  const client = await getClient();
  try {
    await client.query('BEGIN');

    let profileImageMedia;

    if (uploadedFileInfo && uploadedFileInfo.uploadedToS3) {
      const {
        name,
        key,
        bucket,
        bucketRegion,
        size,
        fileType,
      } = uploadedFileInfo;

      profileImageMedia = await Media.createMedia(
        {
          fileName: name,
          fileType,
          size,
          key,
          bucket,
          bucketRegion,
          createdBy: id,
        },
        client,
      );
    }

    const updatedUser = await User.updateTherapistAccount(
      {
        bio,
        contactNumber,
        contactEmail,
        profilePhotoMediaId: profileImageMedia && profileImageMedia.id,
        id,
      },
      client,
    );

    await client.query('COMMIT');

    return updatedUser;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default createTherapistProfile;
