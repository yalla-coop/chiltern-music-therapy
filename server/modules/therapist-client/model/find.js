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
      tc.therapist_user_id
    FROM therapist_clients AS tc
    INNER JOIN users AS u ON(u.id = tc.client_user_id)
    WHERE tc.client_user_id = $1
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export {
  findClientByInviteToken,
  findTherapistByInviteToken,
  findClientByUserId,
  findTherapistClientByClientId,
};
