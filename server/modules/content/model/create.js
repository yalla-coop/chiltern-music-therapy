import { query } from '../../../database';

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
  ) VALUES (
    $1,
    $2
  )
  RETURNING *
  `;

  const values = [contentId, catId];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createCategory, createContentCategory };
