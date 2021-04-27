import { S3 } from './config';
import config from '../../config';

const { env } = config.common;

// There isn't a move operation in the S3 API, so you're correct that it's standard practice to copy an object, then to delete it.
// deleting from s3 incurs a small fee.

const moveFile = async ({ bucket, key }) => {
  // if (env === 'production') {
  // copy object to root folder
  try {
    const copy = await S3.copyObject({
      Bucket: bucket,
      CopySource: key, // old file Key
      Key: key.replace('temp/', ''), // new file key});
    });
    console.log(`copy`, copy);

    // delete from /temp folder
    // await S3.deleteObject({ Bucket: bucket, Key: key });

    return copy;
    // }
  } catch (error) {
    console.log(`error!!!!!!!!`, error);
    return error;
  }
};

export default moveFile;
