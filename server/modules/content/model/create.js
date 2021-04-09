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

const createContentCategory = async ({ text }) => {
  const sql = `
    INSERT INTO content_categories(text)
      VALUES ($1) RETURNING id as "category_id"
  `;
  const res = await query(sql, [text]);
  return res.rows[0];
};

export { createContent, createContentCategory };
