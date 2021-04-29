import { S3 } from './config';
import config from '../../config';

const { env } = config.common;

const dummyDataKeys = [
  '4/video/mp4-69bfcd80-539a-43d7-848d-234bd48b5e9c-yt1s.com - An introduction to music therapy_v240P.mp4',
  '4/video/mp4-fbc411cb-a34c-43e1-a954-3e764b6e07c4-yt1s.com -What is Music Therapy_v240P.mp4',
  '4/audio/mpeg-3b2fbf25-1ac5-4306-9841-09aa460a1a83-6 tips for better sleep Sleeping with Science, a TED series.mp3',
  'd4/audio/mpeg-6ab5e86e-60c0-4196-831b-94f05154067c-My Job Music Therapist.mp3ummyKey4',
  '4/application/pdf-d790a706-f055-49af-8947-b7d5297d5673-4-AKGoyaletal13-18.pdf',
  '4/video/mp4-d44c3fe5-f2ef-4924-b4bc-c6e9af15925d-yt1s.com - Placeholder Video_360p.mp4',
];

const deleteFile = async ({ bucket, key }) => {
  if (env === 'production' || !dummyDataKeys.includes(key)) {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    return S3.deleteObject(params).promise();
  }
};

export default deleteFile;
