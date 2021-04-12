import { query } from '../../../database';

const editTherapistClientById = async (
  { clientId, therapyBackground, therapyGoals },
  client,
) => {
  const values = [clientId, therapyBackground, therapyGoals];
  const sql = `
    UPDATE therapist_clients
    SET
      therapy_background = $2,
      therapy_goals = $3
    WHERE client_user_id = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { editTherapistClientById };
