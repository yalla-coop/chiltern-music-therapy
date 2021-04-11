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

const createCategory = async ({ text }, client) => {
  const sql = `
    INSERT INTO content_categories(
      text
    ) VALUES (
      $1
    )
    RETURNING *
    `;

  const values = [text];

  const res = await query(sql, values, client);
  return res.rows[0];
};

const createContentCategory = async ({ contentId, catId }, client) => {
  const sql = `
  INSERT INTO contents_content_categories(
    content_id,
    category_id
  )
  SELECT
      $1,
      $2
  WHERE NOT EXISTS (
      SELECT
       1
      FROM contents_content_categories
      WHERE (content_id, category_id) = ($1, $2)
    )
    RETURNING *
  `;

  const values = [contentId, catId];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createCategory, createContentCategory, createContent };
