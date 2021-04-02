import { query } from '../../../database';

const createUser = async (
  { firstName, lastName, email, postcode, roles, password },
  client,
) => {
  const sql = `
    INSERT INTO users(
      first_name,
      last_name,
      email,
      postcode,
      roles,
      password
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    RETURNING *
    `;

  const values = [firstName, lastName, email, postcode, roles, password];

  const res = await query(sql, values, client);
  delete res.rows[0].password;
  return res.rows[0];
};

export { createUser };
