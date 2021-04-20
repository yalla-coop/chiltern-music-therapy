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

const createCategories = async ({ texts }, client) => {
  const sql = `
    INSERT INTO content_categories(
      text
    ) SELECT * FROM UNNEST (
      $1::text[]
    ) ON CONFLICT ON CONSTRAINT content_categories_text_key
      DO UPDATE SET updated_at = NOW()

    RETURNING *
    `;

  const values = [texts];

  const res = await query(sql, values, client);
  return res.rows;
};

const createContentsContentCategory = async (
  { contentsIds, categoriesIds },
  client,
) => {
  const sql = `
  INSERT INTO contents_content_categories (
    content_id,
    category_id
  ) SELECT
      u.content_id,
      u.category_id
    FROM
    UNNEST(
      $1::integer[],
      $2::integer[]
    ) AS u(content_id, category_id)
    ON CONFLICT (content_id, category_id)
      DO UPDATE SET updated_at = NOW()
  RETURNING *
  `;

  const values = [contentsIds, categoriesIds];

  const res = await query(sql, values, client);
  return res.rows;
};

export { createCategories, createContent, createContentsContentCategory };
