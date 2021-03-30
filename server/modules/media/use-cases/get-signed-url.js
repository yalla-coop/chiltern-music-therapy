import { getSignedURL as getSignedURLService } from '../../../services/files-storage';

/**
 *  create new image in db only
 * @param {userId} param0 image owner user id
 * @param {fileName} param0 the original file name
 * @param {imageType} param0 image type (cover | logo | activity)
 * @param {fileType} param0 original fileType (image/jpg | image/png | ...)
 */
const getSignedURL = async ({
  userId,
  fileType,
  fileName,
  fileSize,
  fileCategory,
  fileMaxSize,
}) => {
  const { url, name, key, bucketRegion, bucket } = await getSignedURLService({
    userId,
    fileType,
    fileName,
    fileSize,
    fileCategory,
    fileMaxSize,
  });
  return { url, name, key, bucketRegion, bucket };
};

export default getSignedURL;
