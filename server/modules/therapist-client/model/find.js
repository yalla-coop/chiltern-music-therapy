import { query } from '../../../database';

// for pub/sub
// DON'T USE to return results directly to users
const findTherapistClientWithUsersById = async (id) => {
  const values = [id];
  const sql = `
  SELECT
    tc.id,
    tc.therapist_user_id,
    tc.client_user_id,
    tc.therapy_background,
    tc.therapy_goals,
    tc.therapist_bio,
    tc.therapist_intro,
    tc.therapist_message,
    tc.invite_token,
    tc.created_at,
    tc.updated_at,
    --
    c.id AS "client.id",
    c.first_name AS "client.first_name",
    c.last_name AS "client.last_name",
    c.email AS "client.email",
    c.password AS "client.password",
    c.reset_password_token AS "client.reset_password_token",
    c.over_16 AS "client.over_16",
    c.postcode AS "client.postcode",
    c.mobile_number AS "client.mobile_number",
    c.contact_number AS "client.contact_number",
    c.roles AS "client.roles",
    c.status AS "client.status",
    c.contact_email AS "client.contact_email",
    c.bio AS "client.bio",
    c.profile_photo_media_id AS "client.profile_photo_media_id",
    c.organisation_id AS "client.organisation_id",
    c.created_at AS "client.created_at",
    c.updated_at AS "client.updated_at",
    --
    t.id AS "therapist.id",
    t.first_name AS "therapist.first_name",
    t.last_name AS "therapist.last_name",
    t.email AS "therapist.email",
    t.password AS "therapist.password",
    t.reset_password_token AS "therapist.reset_password_token",
    t.over_16 AS "therapist.over_16",
    t.postcode AS "therapist.postcode",
    t.mobile_number AS "therapist.mobile_number",
    t.contact_number AS "therapist.contact_number",
    t.roles AS "therapist.roles",
    t.status AS "therapist.status",
    t.contact_email AS "therapist.contact_email",
    t.bio AS "therapist.bio",
    t.profile_photo_media_id AS "therapist.profile_photo_media_id",
    t.organisation_id AS "therapist.organisation_id",
    t.created_at AS "therapist.created_at",
    t.updated_at AS "therapist.updated_at"

  FROM therapist_clients AS tc
  INNER JOIN users AS t ON(t.id = tc.therapist_user_id)
  INNER JOIN users AS c ON(c.id = tc.client_user_id)
  WHERE tc.id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};
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
      u.status,
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

const findTherapistClientID = async ({ clientId, therapistId }, client) => {
  const values = [clientId, therapistId];

  const sql = `
    SELECT
      id
    FROM therapist_clients
    WHERE client_user_id = $1 AND therapist_user_id = $2;
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const findClientsByTherapist = async (therapistId) => {
  const values = [therapistId];

  const sql = `
    SELECT
      u.first_name,
      u.last_name,
      u.postcode,
      u.id,
      u.status
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
  findTherapistClientWithUsersById,
  findClientByUserId,
  findTherapistClientByClientId,
  findTherapyByClientId,
  findTherapistClientID,
};
