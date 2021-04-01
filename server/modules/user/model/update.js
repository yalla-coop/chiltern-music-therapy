import { query } from '../../../database';

const updateUserById = async (
  {
    id,
    email,
    firstName,
    lastName,
    password,
    resetPasswordToken,
    over16,
    postcode,
    mobileNumber,
    contactNumber,
    roles,
    status,
    contactEmail,
    bio,
    profilePhotoMediaId,
    organisationId,
  },
  client,
) => {
  const values = [
    id,
    email,
    firstName,
    lastName,
    password,
    resetPasswordToken,
    over16,
    postcode,
    mobileNumber,
    contactNumber,
    roles,
    status,
    contactEmail,
    bio,
    profilePhotoMediaId,
    organisationId,
  ];
  const sql = `
    UPDATE users AS u
    SET
      email = COALESCE($2, u.email),
      first_name = COALESCE($3, u.first_name),
      last_name = COALESCE($4, u.last_name),
      password = COALESCE($5, u.password),
      reset_password_token = COALESCE($6, u.reset_password_token),
      over_16 = COALESCE($7, u.over_16),
      postcode = COALESCE($8, u.postcode),
      mobile_number = COALESCE($9, u.mobile_number),
      contact_number = COALESCE($10, u.contact_number),
      roles = COALESCE($11, u.roles),
      status = COALESCE($12, u.status),
      contact_email = COALESCE($13, u.contact_email),
      bio = COALESCE($14, u.bio),
      profile_photo_media_id = COALESCE($15, u.profile_photo_media_id),
      organisation_id = COALESCE($16, u.organisation_id)
    WHERE u.id = $1
    RETURNING *
  `;

  const res = await query(sql, values, client);
  console.log(res.rows);
  delete res.rows[0].password;
  return res.rows[0];
};

export { updateUserById };
