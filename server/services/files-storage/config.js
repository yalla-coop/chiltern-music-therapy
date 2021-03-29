import AWS from 'aws-sdk';
import config from '../../config';

const { env } = config.common;

const {
  awsAccessKeyId,
  imagesBucket,
  bucketRegion,
  awsSecretAccessKey,
} = config.aws;

let s3;
if (env !== 'test') {
  s3 = new AWS.S3({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: bucketRegion,
  });
}

const S3 = s3;
export { S3, imagesBucket as bucket, bucketRegion as region };
