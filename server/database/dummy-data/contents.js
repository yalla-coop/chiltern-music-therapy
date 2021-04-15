import { query } from '../connect';

const createContent = async ({
  mediaId,
  title,
  instructions,
  link,
  libraryContent,
  therapistLibraryUserId,
  type,
}) => {
  const sql = `
    INSERT INTO contents(
      media_id,
      title,
      instructions,
      link,
      library_content,
      therapist_library_user_id,
      type
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
    mediaId,
    title,
    instructions,
    link,
    libraryContent,
    therapistLibraryUserId,
    type,
  ]);
  return res.rows[0];
};

const createContents = async ({ media, therapistClients }) => {
  const content1 = await createContent({
    mediaId: media.video1.id,
    title: 'Video title',
    instructions: `Hi! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.`,
    link: null,
    libraryContent: false,
    therapistLibraryUserId: therapistClients.therapist1Client1.therapistUserId,
    type: 'VIDEO',
  });
  const content2 = await createContent({
    mediaId: media.audio1.id,
    title: 'Audio title',
    instructions: `Hi! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.`,
    link: null,
    libraryContent: true,
    therapistLibraryUserId: therapistClients.therapist1Client1.therapistUserId,
    type: 'AUDIO',
  });

  const content3 = await createContent({
    mediaId: null,
    title: 'Audio External title',
    instructions: `External Hi! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.`,
    link: 'www.audiocontent.com',
    libraryContent: true,
    therapistLibraryUserId: therapistClients.therapist1Client1.therapistUserId,
    type: 'AUDIO',
  });
  const content4 = await createContent({
    mediaId: media.doc1.id,
    title: 'PDF file uploaded at s3',
    instructions: `Internal S3 Hi! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.`,
    link: null,
    libraryContent: true,
    therapistLibraryUserId: therapistClients.therapist1Client1.therapistUserId,
    type: 'DOCUMENT',
  });

  return {
    content1,
    content2,
    content3,
    content4,
  };
};

export default createContents;
