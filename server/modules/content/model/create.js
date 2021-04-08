import { query } from '../../../database';

const createContent = async (
  {
    mediaId,
    title,
    instructions,
    link,
    docContent,
    libraryContent,
    therapistLibraryUserId,
    type,
  },
  client,
) => {
  const values = [
    mediaId,
    title,
    instructions,
    link,
    docContent,
    libraryContent,
    therapistLibraryUserId,
    type,
  ];

  const sql = `
    INSERT INTO contents(
      media_id,
      title,
      instructions,
      link,
      doc_content,
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
        $7,
        $8
      ) RETURNING id
  `;
  const res = await query(sql, values, client);

  return res.rows[0];
};

export { createContent };
