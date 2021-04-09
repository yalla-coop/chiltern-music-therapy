import { query } from '../../../database';

const removeContentFromLibrary = async (id, client) => {
  const values = [id];
  const sql = `
    UPDATE content
    SET 
      library_content = FALSE
    WHERE id = $1
    RETURNING *
  `;
  const res = await query(sql, values, client);
  return res.rows[0];
};

export { removeContentFromLibrary };
