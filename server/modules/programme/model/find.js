import { query } from '../../../database';

const findProgrammesByClient = async (userId) => {
  const values = [userId];

  const sql = `
    SELECT 
    p.id, p.created_at
    FROM programmes p
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    WHERE tc.client_user_id = $1
  `;

  const res = await query(sql, values);
  return res.rows;
};

export { findProgrammesByClient };
