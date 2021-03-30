import { query } from '../../../database';

const findUserById = async (id) => {
  const values = [id];
  const sql = `
  SELECT
    id,
    email,
    postcode,
    roles
  FROM users
    WHERE id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const values = [email];
  const sql = `
  SELECT
    id,
    email,
    password,
    postcode,
    roles

  FROM users
    WHERE email = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

export { findUserById, findUserByEmail };
