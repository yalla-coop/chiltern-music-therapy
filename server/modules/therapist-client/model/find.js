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

const findClientByInviteToken = async (inviteToken, client) => {
  const values = [inviteToken];
  const sql = `
    SELECT
      u.id,
      u.roles,
      u.status,
      tc.id AS "therapist_clients.id"
    FROM therapist_clients AS tc
    INNER JOIN users AS u ON(u.id = tc.client_user_id)
    WHERE tc.invite_token = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const findTherapistByInviteToken = async (inviteToken, client) => {
  const values = [inviteToken];
  const sql = `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      tc.id AS "therapist_clients.id"
    FROM therapist_clients AS tc
    INNER JOIN users AS u ON(u.id = tc.therapist_user_id)
    WHERE tc.invite_token = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const findTherapyByClientId = async (id) => {
  const values = [id];
  const sql = `
    SELECT
      therapy_background,
      therapy_goals,
      therapist_bio,
      therapist_intro,
      therapist_message
    FROM therapist_clients
    WHERE client_user_id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

export {
  findClientByInviteToken,
  findTherapistByInviteToken,
  findTherapyByClientId,
  findTherapistByClientId,
};
