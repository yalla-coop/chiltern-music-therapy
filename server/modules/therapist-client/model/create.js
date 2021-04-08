import { query } from '../../../database';

const createClient = async (
  {
    clientId,
    therapistId,
    therapyBackground,
    therapyGoals,
    therapistBio,
    therapistIntro,
    inviteToken,
  },
  client,
) => {
  const sql = `
    INSERT INTO therapist_clients(
      client_user_id,
      therapist_user_id,
      therapy_background,
      therapy_goals,
      therapist_bio,
      therapist_intro,
      invite_token
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    RETURNING (
      id,
      invite_token
    )
    `;

  const values = [
    clientId,
    therapistId,
    therapyBackground,
    therapyGoals,
    therapistBio,
    therapistIntro,
    inviteToken,
  ];

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createClient };
