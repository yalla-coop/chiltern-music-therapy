import { query } from '../../../database';
import { userRoles } from '../../../constants/data-type';

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

<<<<<<< HEAD
const findUserByResetToken = async (token, client) => {
  const values = [token];
  const sql = `
  SELECT
    id,
    reset_password_expiry
  FROM users
    WHERE reset_password_token = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { findUserById, findUserByEmail, findUserByResetToken };
=======
const findTherapists = async () => {
  const sql = `
    SELECT first_name, last_name, id, roles::VARCHAR[] FROM users  
  `;

  const res = await query(sql);
  const therapists = res.rows
    ? res.rows.filter(({ roles }) => roles.includes(userRoles.THERAPIST))
    : [];

  return therapists;
};

export { findUserById, findUserByEmail, findTherapists };
>>>>>>> develop
