import { query } from '../../../database';

const deleteProgressUpdatesByClientId = async (id) => {
  const sql = `
    DELETE FROM progress_updates
    WHERE id IN (
      SELECT 
        p.id
      FROM therapist_clients AS tc
      INNER JOIN programmes AS p ON (p.therapists_clients_id = tc.id)
      WHERE tc.client_user_id = $1
    )
    RETURNING *
  `;

  const res = await query(sql, [id]);
  return res.rows;
};

export { deleteProgressUpdatesByClientId };
