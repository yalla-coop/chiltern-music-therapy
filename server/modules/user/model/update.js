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
  { email, firstName, lastName, id },
  client,
) => {
  const values = [email, firstName, lastName, id];

  const sql = `
    UPDATE users 
    SET
      email = $1,
      first_name = $2,
      last_name= $3
    WHERE 
      id = $4
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
    id,
  ];

  // NEED TO SORT PROFILE IMAGE

  const sql = `
    UPDATE users 
    SET
      email = $1,
      first_name = $2,
      last_name= $3,
      bio = $4,
      contact_number = $5,
      contact_email = $6
    WHERE 
      id = $7
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
