import { getFilePreSignedUrl as getMediaUrlService } from '../../../services/files-storage';

const getMediaUrl = async ({ key, bucket }) => {
  const mediaUrl = await getMediaUrlService({
    key,
    bucket,
  });
  return mediaUrl;
};

export default getMediaUrl;
