import { S3 } from './config';
import config from '../../config';

const { env } = config.common;

const deleteFile = async ({ bucket, key }) => {
  if (env === 'production' || !key.includes('test-')) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return S3.deleteObject(params);
  }
};

export default deleteFile;
