import { query } from '../connect';
import { bucket, region } from '../../services/files-storage/config';

const createMedia = async ({ type, fileName, key, createdBy, path }) => {
  const sql = `
    INSERT INTO media(
      type,
      file_name,
      key,
      bucket,
      bucket_region,
      created_by,
      path
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      ) RETURNING *
  `;
  const res = await query(sql, [
    type,
    fileName,
    key,
    bucket,
    region,
    createdBy,
    path,
  ]);
  return res.rows[0];
};

const createMedias = async ({ users }) => {
  const video1 = await createMedia({
    type: 'VIDEO',
    fileName: 'therapist-test-video.mp4',
    key: 'dummyKey1',
    createdBy: users.therapist1.id,
  });

  const video2 = await createMedia({
    type: 'VIDEO',
    fileName: 'therapist-test-video-2.mp4',
    key: 'dummyKey2',
    createdBy: users.therapist1.id,
  });

  const audio1 = await createMedia({
    type: 'AUDIO',
    fileName: 'therapist-test-audio-1.mp3',
    key: 'dummyKey3',
    path: '/test.mp3',
    createdBy: users.therapist1.id,
  });

  const audio2 = await createMedia({
    type: 'AUDIO',
    fileName: 'therapist-test-audio-2.mp3',
    key: 'dummyKey4',
    createdBy: users.therapist1.id,
  });

  const therapist1ProfileImage = await createMedia({
    type: 'PROFILE_IMAGE',
    fileName: 'therapist-profile-image-1.mp3',
    key: 'dummyKey5',
    createdBy: users.therapist1.id,
  });

  return {
    video1,
    video2,
    audio1,
    audio2,
    therapist1ProfileImage,
  };
};

export default createMedias;
