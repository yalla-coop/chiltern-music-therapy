import { query } from '../../../database';

const findTherapistClientByClientId = async (clientId, client) => {
  const values = [clientId];
  const sql = `
    SELECT
      id,
      therapist_user_id
    FROM therapist_clients
    WHERE client_user_id = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

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

const findClientByUserId = async (clientId, client) => {
  const values = [clientId];
  const sql = `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.postcode,
      tc.therapy_background,
      tc.therapy_goals,
      tc.therapist_user_id
    FROM therapist_clients AS tc
    INNER JOIN users AS u ON(u.id = tc.client_user_id)
    WHERE tc.client_user_id = $1
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

const findTherapistByClient = async (clientId) => {
  const values = [clientId];

  const sql = `
    SELECT 
      u.first_name,
      u.last_name,
      u.id
    FROM therapist_clients tc 
    INNER JOIN users u ON tc.therapist_user_id = u.id 
    WHERE tc.client_user_id = $1; 
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

const findClientsByTherapist = async (therapistId) => {
  const values = [therapistId];

  const sql = `
    SELECT 
      u.first_name,
      u.last_name,
      u.postcode,
      u.id
    FROM therapist_clients tc 
    INNER JOIN users u ON tc.client_user_id = u.id 
    WHERE tc.therapist_user_id = $1
    ORDER BY u.created_at DESC;
  `;

  const res = await query(sql, values);

  return res.rows;
};

export {
  findClientByInviteToken,
  findTherapistByInviteToken,
  findTherapistByClient,
  findClientsByTherapist,
  findTherapistByClientId,
  findClientByUserId,
  findTherapistClientByClientId,
  findTherapyByClientId,
};
