import { query } from '../../../database';

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

const findTherapistByClient = async (clientId) => {
  const values = [clientId];

  const sql = `
    SELECT 
      u.firstName,
      u.lastName,
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
      u.firstName,
      u.lastName,
      u.postcode,
      u.id
    FROM therapist_clients tc 
    INNER JOIN users u ON tc.client_user_id = u.id 
    WHERE tc.therapist_user_id = $1; 
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

export {
  findClientByInviteToken,
  findTherapistByInviteToken,
  findTherapistByClient,
  findClientsByTherapist,
};
