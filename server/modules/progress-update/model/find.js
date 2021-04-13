import { query } from '../../../database';

// for pub/sub
// DON'T USE to return results directly to users
const findProgressUpdateWithUsersById = async (progressId) => {
  const values = [progressId];

  const sql = `
    SELECT
      pu.id,
      pu.programme_id,
      pu.media_id,
      pu.client_message,
      pu.therapist_message,
      pu.link,
      pu.type,
      pu.created_at,
      pu.updated_at,
      --
      p.id AS "programme.id",
      p.therapists_clients_id AS "programme.therapists_clients_id",
      p.description AS "programme.description",
      p.status AS "programme.status",
      p.created_at AS "programme.created_at",
      p.updated_at AS "programme.updated_at",
      --
      tc.id AS "therapist_client.id",
      tc.therapist_user_id AS "therapist_client.therapist_user_id",
      tc.client_user_id AS "therapist_client.client_user_id",
      tc.therapy_background AS "therapist_client.therapy_background",
      tc.therapy_goals AS "therapist_client.therapy_goals",
      tc.therapist_bio AS "therapist_client.therapist_bio",
      tc.therapist_intro AS "therapist_client.therapist_intro",
      tc.therapist_message AS "therapist_client.therapist_message",
      tc.invite_token AS "therapist_client.invite_token",
      tc.created_at AS "therapist_client.created_at",
      tc.updated_at AS "therapist_client.updated_at",
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

    FROM progress_updates AS pu
    INNER JOIN programmes AS p ON (pu.programme_id = p.id)
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    INNER JOIN users AS t ON(t.id = tc.therapist_user_id)
    INNER JOIN users AS c ON(c.id = tc.client_user_id)
    WHERE pu.id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

const findProgressUpdateById = async (progressId) => {
  const values = [progressId];

  const sql = `
    SELECT
      pu.id,
      pu.programme_id,
      pu.client_message,
      pu.therapist_message,
      pu.type,
      --
      tc.id AS "therapist_client.id",
      tc.therapist_user_id AS "therapist_client.therapist_user_id",
      tc.client_user_id AS "therapist_client.client_user_id",
      --
      c.id AS "client.id",
      c.first_name AS "client.first_name",
      c.last_name AS "client.last_name",
      --
      m.id AS "file.id",
      m.key AS "file.key",
      m.bucket AS "file.bucket"

    FROM progress_updates AS pu
    INNER JOIN programmes AS p ON (pu.programme_id = p.id)
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    INNER JOIN users AS c ON(c.id = tc.client_user_id)
    LEFT JOIN media AS m ON(pu.media_id = m.id)
    WHERE pu.id = $1
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

export { findProgressUpdateWithUsersById, findProgressUpdateById };
