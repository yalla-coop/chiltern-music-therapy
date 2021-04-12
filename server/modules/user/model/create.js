import { query } from '../../../database';

const createUser = async (
  {
    firstName,
    lastName,
    email,
    postcode,
    roles,
    password,
    mobileNumber,
    contactNumber,
    status,
  },
  client,
) => {
  const sql = `
    INSERT INTO users(
      first_name,
      last_name,
      email,
      postcode,
      roles,
      password,
      mobile_number,
      contact_number,
      status
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9
    )
    RETURNING 
      id,
      first_name,
      last_name,
      email,
      postcode,
      roles::VARCHAR[]
    `;

  const values = [
    firstName,
    lastName,
    email,
    postcode,
    roles,
    password,
    mobileNumber,
    contactNumber,
    status,
  ];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createUser };
