import { query } from '../../../database';

const createProgressUpdate = async (
  { programmeId, mediaId, clientMessage, link, type },
  client,
) => {
  const sql = `
    INSERT INTO progress_updates(
      programme_id,
      media_id,
      client_message,
      link,
      type
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
      )
    RETURNING *
    `;

  const values = [programmeId, mediaId, clientMessage, link, type];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createProgressUpdate };
