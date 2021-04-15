import { query } from '../../../database';

const updateContentById = async (
  { contentId, title, instructions, libraryContent },
  client,
) => {
  const values = [contentId, title, instructions, libraryContent];

  const sql = `
    UPDATE contents
    SET
      title = $2,
      instructions = $3,
      library_content = $4
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const removeContentFromLibrary = async ({ id }, client) => {
  const values = [id];
  const sql = `
    UPDATE contents
    SET
      library_content = FALSE
    WHERE id = $1
    RETURNING *
  `;
  const res = await query(sql, values, client);
  return res.rows[0];
};

const editContent = async ({ id, title, instructions }, client) => {
  const values = [id, title, instructions];

  const sql = `
    UPDATE contents
    SET
      title = $2,
      instructions = $3
    WHERE id = $1
    RETURNING *
  `;
  const res = await query(sql, values, client);
  return res.rows[0];
};

export { removeContentFromLibrary, editContent, updateContentById };
