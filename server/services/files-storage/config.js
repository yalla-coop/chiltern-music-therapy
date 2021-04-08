import AWS from 'aws-sdk';
import config from '../../config';

const { env } = config.common;

const { awsAccessKeyId, bucket, bucketRegion, awsSecretAccessKey } = config.aws;

let s3;
if (env !== 'test') {
  s3 = new AWS.S3({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: bucketRegion,
  });
}

const S3 = s3;

const allowedFileTypesAndSizes = {
  video: {
    types: ['video/mp4'],
    // 2 GB
    maxSize: '2000',
  },
  document: {
    types: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    // 20 MB
    maxSize: '20',
  },
  audio: {
    types: ['audio/mpeg', 'audio/wav'],
    // 100 MB
    maxSize: '100',
  },
};

export { S3, bucket, bucketRegion as region, allowedFileTypesAndSizes };
