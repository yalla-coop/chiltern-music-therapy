import { query } from '../../../database';

const updateProgressUpdate = async (
  { id, therapistMessage, therapistMessageDate },
  client,
) => {
  const sql = `
    UPDATE progress_updates
      SET
        therapist_message = $2,
        therapist_message_date = $3

    WHERE id = $1
    RETURNING *
    `;

  const values = [id, therapistMessage, therapistMessageDate];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { updateProgressUpdate };
