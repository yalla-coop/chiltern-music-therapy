import { query } from '../../../database';

const deleteContentById = async (id, client) => {
  const sql = `
    DELETE FROM contents
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

const deleteContentCategories = async (id, client) => {
  const sql = `
    DELETE FROM contents_content_categories
    WHERE content_id = $1
    RETURNING *
  `;

  const res = await query(sql, [id], client);
  return res.rows[0];
};

const deleteContentFromProgramme = async (id, client) => {
  const sql = `
    DELETE FROM programmes_contents
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
