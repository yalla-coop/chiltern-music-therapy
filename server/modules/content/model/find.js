import { query } from '../../../database';

const findContentByProg = async (id) => {
  const values = [id];

  const sql = `
    SELECT 
    c.title,
    c.instructions,
    c.link,
    c.type,
    m.file_name,
    m.path,
    tc.therapist_user_id,
    tc.client_user_id
    FROM contents c
    INNER JOIN programmes_contents pc ON pc.content_id = c.id
    INNER JOIN programmes p ON pc.programme_id = p.id
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    LEFT JOIN media m ON c.media_id = m.id
    WHERE pc.programme_id = $1
  `;

  const res = await query(sql, values);
  return res.rows;
};

export { findContentByProg };
