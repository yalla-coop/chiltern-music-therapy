import { query } from '../../../database';

const deleteContentById = async (id, client) => {
  const sql = `
    DELETE FROM content
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

const deleteContentCategories = async (id, client) => {
  const sql = `
    DELETE FROM content_categories_content 
    WHERE content_id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

const deleteContentFromProgramme = async (id, client) => {
  const sql = `
    DELETE FROM programme_contents
    WHERE content_id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

export {
  deleteContentById,
  deleteContentCategories,
  deleteContentFromProgramme,
};
