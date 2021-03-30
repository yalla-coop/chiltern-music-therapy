import { query } from '../../../database';

const createUser = async ({ email, postcode, roles }, client) => {
  const sql = `
    INSERT INTO users(
      email,
      postcode,
      roles
    ) VALUES (
      $1,
      $2,
      $3
    )
    RETURNING *
    `;

  const values = [email, postcode, roles];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createUser };
