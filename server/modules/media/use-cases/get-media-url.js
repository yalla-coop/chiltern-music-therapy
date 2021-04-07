import { getMediaUrl as getMediaUrlService } from '../../../services/files-storage';

const getMediaUrl = async ({ userId, key, bucket, bucketRegion }) => {
  const mediaUrl = await getMediaUrlService({
    userId,
    key,
    bucket,
    bucketRegion,
  });
  return mediaUrl;
};

export default getMediaUrl;
