import { query } from '../connect';

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  resetPasswordToken,
  over16,
  mobileNumber,
  contactNumber,
  roles,
  status,
  contactEmail,
  bio,
  profilePhotoMediaId,
  organisationId,
  postcode,
}) => {
  const sql = `INSERT INTO users(
    first_name,
    last_name,
    email,
    password,
    reset_password_token,
    over_16,
    mobile_number,
    contact_number,
    roles,
    status,
    contact_email,
    bio,
    profile_photo_media_id,
    organisation_id,
    postcode
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14,
    $15
    ) RETURNING *`;
  const res = await query(sql, [
    firstName,
    lastName,
    email,
    password,
    resetPasswordToken,
    over16,
    mobileNumber,
    contactNumber,
    roles,
    status,
    contactEmail,
    bio,
    profilePhotoMediaId,
    organisationId,
    postcode,
  ]);
  return res.rows[0];
};
// 123456Aa password
const password = '$2a$08$23ik.euo.8EM.tqkX/43ke539bnaWX/2vK8nsbrdlYl0UhGMwCR92';

const createUsers = async (data) => {
  const admin1 = await createUser({
    firstName: 'chiltren',
    lastName: 'admin',
    email: 'digital@chilternmusictherapy.co.uk',
    password,
    resetPasswordToken: null,
    over16: true,
    roles: ['ADMIN'],
    status: 'ACTIVE',
    contactEmail: null,
    bio: null,
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  return {
    admin1,
  };
};

export default createUsers;
