import Boom from '@hapi/boom';
import { getFilePreSignedUrl } from '../../../services/files-storage';
import * as TherapistClient from '../model';

const getMyTherapist = async ({ userId }) => {
  const therapist = await TherapistClient.findTherapistByClientId(userId);
  if (!therapist) {
    throw Boom.notFound();
  }

  // if therapist added a specific bio
  if (therapist.therapistBio) {
    therapist.bio = therapist.therapistBio;
  }

  if (therapist.file && therapist.file.key) {
    const profileImage = await getFilePreSignedUrl({
      key: therapist.file.key,
      bucket: therapist.file.bucket,
    });

    therapist.profileImage = profileImage;
  }

  return therapist;
};

export default getMyTherapist;
