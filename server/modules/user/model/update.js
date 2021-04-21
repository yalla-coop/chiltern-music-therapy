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
    RETURNING 
      u.id, 
      u.email, 
      u.first_name, 
      u.last_name, 
      u.postcode, 
      u.roles::VARCHAR[],
      u.contact_email,
      u.bio,
      u.profile_photo_media_id,
      u.organisation_id
  `;

  const res = await query(sql, values, client);
  delete res.rows[0].password;
  return res.rows[0];
};

const updateResetPasswordToken = async ({ token, userId }) => {
  const values = [token, userId];

  const sql = `
    UPDATE users
    SET
      reset_password_token = $1,
      reset_password_expiry = NOW() + INTERVAL '1 DAY'
    WHERE
      id = $2
    RETURNING
      reset_password_token,
      first_name,
      email
  `;

  const res = await query(sql, values);
  return res.rows[0];
};

const updatePassword = async ({ password, userId }, client) => {
  const values = [password, userId];

  const sql = `
    UPDATE users
    SET
      password = $1,
      reset_password_expiry = NOW()
    WHERE
      id = $2
    RETURNING
      first_name,
      email
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const updateClientAccount = async (
  { email, firstName, lastName, mobileNumber, contactNumber, id },
  client,
) => {
  const values = [email, firstName, lastName, mobileNumber, contactNumber, id];

  const sql = `
    UPDATE users
    SET
      email = $1,
      first_name = $2,
      last_name= $3,
      mobile_number= $4,
      contact_number= $5
    WHERE
      id = $6
    RETURNING
      first_name,
      last_name,
      email,
      postcode,
      mobile_number,
      contact_number,
      roles::VARCHAR[],
      id
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const updateTherapistAccount = async (
  {
    email,
    firstName,
    lastName,
    bio,
    contactNumber,
    contactEmail,
    profilePhotoMediaId,
    id,
  },
  client,
) => {
  const values = [
    email,
    firstName,
    lastName,
    bio,
    contactNumber,
    contactEmail,
    profilePhotoMediaId,
    id,
  ];

  // NEED TO SORT PROFILE IMAGE

  const sql = `
    UPDATE users u
    SET
      email = COALESCE($1, u.email),
      first_name = COALESCE($2, u.first_name),
      last_name= COALESCE($3, u.last_name),
      bio = COALESCE($4, u.bio),
      contact_number = COALESCE($5, u.contact_number),
      contact_email = COALESCE($6, u.contact_email),
      profile_photo_media_id  = COALESCE($7, u.profile_photo_media_id)
    WHERE
      id = $8
    RETURNING
      first_name,
      last_name,
      email,
      postcode,
      roles::VARCHAR[],
      id
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export {
  updateUserById,
  updateResetPasswordToken,
  updatePassword,
  updateClientAccount,
  updateTherapistAccount,
};
