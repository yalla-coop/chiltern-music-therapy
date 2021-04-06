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
    organisation_id
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
    $14
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
  ]);
  return res.rows[0];
};
// 123456Aa password
const password = '$2a$08$23ik.euo.8EM.tqkX/43ke539bnaWX/2vK8nsbrdlYl0UhGMwCR92';

const createUsers = async (data) => {
  const client1 = await createUser({
    firstName: 'Sibelle',
    lastName: 'Doret',
    email: 'client1@cmt.com',
    password,
    resetPasswordToken: null,
    over16: true,
    mobileNumber: '8859037061',
    contactNumber: '5877546694',
    roles: ['CLIENT'],
    status: 'ACTIVE',
    contactEmail: 'speak0@un.org',
    bio: null,
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  const client2 = await createUser({
    firstName: 'Elie',
    lastName: 'Anmore',
    email: 'client2@cmt.com',
    password,
    resetPasswordToken: null,
    over16: true,
    mobileNumber: '5048253879',
    contactNumber: '3732021121',
    roles: ['CLIENT'],
    status: 'ACTIVE',
    contactEmail: 'eanmore2@aboutads.info',
    bio: null,
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  // invited client
  const client3 = await createUser({
    firstName: 'John',
    lastName: 'Doe',
    email: 'client3@cmt.com',
    password: null,
    resetPasswordToken: null,
    over16: true,
    mobileNumber: '4448253879',
    contactNumber: '4432021121',
    roles: ['CLIENT'],
    status: 'INVITED',
    contactEmail: null,
    bio: null,
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  const therapist1 = await createUser({
    firstName: 'Raoul',
    lastName: 'Mahoney',
    email: 'therapist1@cmt.com',
    password,
    resetPasswordToken: null,
    over16: true,
    mobileNumber: '6073979611',
    contactNumber: '4757979809',
    roles: ['THERAPIST'],
    status: 'ACTIVE',
    contactEmail: 'rmahoney4@imdb.com',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  const therapist2 = await createUser({
    firstName: 'Bailey',
    lastName: 'Clausen',
    email: 'therapist2@cmt.com',
    password,
    resetPasswordToken: null,
    over16: true,
    mobileNumber: '6221546308',
    contactNumber: '4757979809',
    roles: ['THERAPIST'],
    status: 'ACTIVE',
    contactEmail: 'bclausen7@fotki.com',
    bio:
      'Lorem ipsum 2 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  const admin1 = await createUser({
    firstName: 'Micah',
    lastName: 'Beagin',
    email: 'admin@cmt.com',
    password,
    resetPasswordToken: null,
    over16: true,
    mobileNumber: '4438983890',
    contactNumber: '4757979809',
    roles: ['ADMIN'],
    status: 'ACTIVE',
    contactEmail: null,
    bio: null,
    profilePhotoMediaId: null,
    organisationId: data.organisations.chilternOrg.id,
  });

  return {
    client1,
    client2,
    client3,
    therapist1,
    therapist2,
    admin1,
  };
};

export default createUsers;
