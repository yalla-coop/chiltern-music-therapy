import { query } from '../connect';

const createContent = async ({
  mediaId,
  title,
  instructions,
  link,
  libraryContent,
  therapistLibraryUserId,
}) => {
  const sql = `
    INSERT INTO contents(
      media_id,
      title,
      instructions,
      link,
      library_content,
      therapist_library_user_id
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
    mediaId,
    title,
    instructions,
    link,
    libraryContent,
    therapistLibraryUserId,
  ]);
  return res.rows[0];
};

const createContents = async ({ media, therapistClients }) => {
  const content1 = await createContent({
    mediaId: media.video1.id,
    title: 'Video title',
    instructions: `Hi! This week we will continue working on choice making and strengthening of left upper limb. I have prepared two demos to support this work during the week. It is recommended that you have a go at least once before our next session.`,
    link: null,
    libraryContent: true,
    therapistLibraryUserId: therapistClients.therapist1Client1.therapistUserId,
  });

  return {
    content1,
  };
};

export default createContents;
