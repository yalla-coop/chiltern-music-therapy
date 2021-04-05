import { query } from '../../../database';

const findProgrammesByUser = async (userId) => {
  const values = [userId];

  const sql = `
    SELECT 
    id, created_at
    FROM programmes
    WHERE therapists_clients_id = $1
  `;

  const res = await query(sql, values);
  return res.rows;
};

export { findProgrammesByUser };
