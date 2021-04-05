import { query } from '../../../database';

const findTherapistByClientId = async (id) => {
  const values = [id];
  const sql = `
  SELECT
    tc.therapist_bio,
    u.first_name,
    u.last_name,
    u.contact_number,
    u.contact_email,
    u.bio,
    m.type AS "file.type",
    m.file_name AS "file.file_name",
    m.key AS "file.key",
    m.bucket AS "file.bucket",
    u.profile_photo_media_id

  FROM therapist_clients AS tc
  INNER JOIN users AS u ON(u.id = tc.therapist_user_id)
  LEFT JOIN media AS m ON(m.id = u.profile_photo_media_id)
    WHERE client_user_id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

export { findTherapistByClientId };
