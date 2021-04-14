import Boom from '@hapi/boom';
import { getFilePreSignedUrl as getMediaUrlService } from '../../../services/files-storage';
import { errorMsgs } from '../../../services/error-handler';

const getMediaUrl = async ({ userId, key, bucket }) => {
  const keyUserId = key.split('/')[0];

  if (Number(keyUserId) !== Number(userId)) {
    throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
  }

  const mediaUrl = await getMediaUrlService({
    key,
    bucket,
  });
  return mediaUrl;
};

export default getMediaUrl;
