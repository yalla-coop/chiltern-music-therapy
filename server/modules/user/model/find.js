import { query } from '../../../database';

const findUserById = async (id, client) => {
  const values = [id];
  const sql = `
  SELECT
    id,
    email,
    first_name,
    last_name,
    postcode,
    roles::VARCHAR[]
  FROM users
    WHERE id = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const findUserByEmail = async (email, client) => {
  const values = [email];
  const sql = `
  SELECT
    id,
    first_name,
    last_name,
    email,
    password,
    postcode,
    roles::VARCHAR[]

  FROM users
    WHERE email = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { findUserById, findUserByEmail };
