import { query } from '../connect';
import { bucket, region } from '../../services/files-storage/config';

const createMedia = async ({ type, fileName, key, createdBy, path }) => {
  const sql = `
    INSERT INTO media(
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
        $6
      ) RETURNING *
  `;
  const res = await query(sql, [
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
    fileName: 'An introduction to music therapy_v240P.mp4',
    key:
      '4/video/mp4-69bfcd80-539a-43d7-848d-234bd48b5e9c-yt1s.com - An introduction to music therapy_v240P.mp4',
    createdBy: users.therapist1.id,
  });

  const video2 = await createMedia({
    fileName: 'What is Music Therapy_v240P.mp4',
    key:
      '4/video/mp4-fbc411cb-a34c-43e1-a954-3e764b6e07c4-yt1s.com -What is Music Therapy_v240P.mp4',
    createdBy: users.therapist1.id,
  });

  const audio1 = await createMedia({
    fileName: '6 tips for better sleep Sleeping with Science, a TED series.mp3',
    key:
      '4/audio/mpeg-3b2fbf25-1ac5-4306-9841-09aa460a1a83-6 tips for better sleep Sleeping with Science, a TED series.mp3',
    path: '/test.mp3',
    createdBy: users.therapist1.id,
  });

  const audio2 = await createMedia({
    fileName: 'My Job Music Therapist.mp3',
    key:
      'd4/audio/mpeg-6ab5e86e-60c0-4196-831b-94f05154067c-My Job Music Therapist.mp3ummyKey4',
    createdBy: users.therapist1.id,
  });

  const doc1 = await createMedia({
    fileName: '4-AKGoyaletal13-18.pdf',
    key:
      '4/application/pdf-d790a706-f055-49af-8947-b7d5297d5673-4-AKGoyaletal13-18.pdf',
    createdBy: users.therapist1.id,
  });

  const therapist1ProfileImage = await createMedia({
    fileName: 'therapist-profile-image-1',
    key: 'dummyKey5',
    createdBy: users.therapist1.id,
  });

  const progress1Video = await createMedia({
    fileName: 'Placeholder Video_360p.mp4',
    key:
      '4/video/mp4-d44c3fe5-f2ef-4924-b4bc-c6e9af15925d-yt1s.com - Placeholder Video_360p.mp4',
    createdBy: users.client1.id,
  });

  return {
    video1,
    video2,
    audio1,
    audio2,
    doc1,
    therapist1ProfileImage,
    progress1Video,
  };
};

export default createMedias;
