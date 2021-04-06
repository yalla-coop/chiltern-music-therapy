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

const findProgrammeById = async (id) => {
  const values = [id];
  const sql = `
    SELECT 
    p.id, 
    p.created_at,
    pu.id 'progress_update.id',
    pu.created_at 'progress_update.created_at',
    pu.therapist_message 'progress_update.therapist_message',
    pf.id 'feedback.id',
    pf.created_at 'feedback.created_at'
    FROM programmes p
    INNER JOIN progress_updates pu ON pu.programme_id = p.id
    INNER JOIN programmes_feedbacks pf ON pf.programme_id = p.id
    WHERE p.id = $1
  `;

  const res = await query(sql, values);
  return res.rows;
};

export { findProgrammesByClient, findProgrammeById };
