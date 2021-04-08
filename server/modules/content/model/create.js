import { query } from '../../../database';

const createContent = async (
  {
    mediaId,
    title,
    instructions,
    link,
    libraryContent,
    therapistLibraryUserId,
    type,
  },
  client,
) => {
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
  const res = await query(
    sql,
    [
      mediaId,
      title,
      instructions,
      link,
      libraryContent,
      therapistLibraryUserId,
      type,
    ],
    client,
  );
  return res.rows[0];
};

export { createContent };
