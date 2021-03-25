import { query } from '../../../database';

const findTestById = async (id) => {
  const values = [id];
  const sql = `
  SELECT id FROM users
    WHERE id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

export { findTestById };
