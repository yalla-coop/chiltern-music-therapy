import * as TherapistClient from '../model';
import * as User from '../../user/model';

import events from '../../../services/events';
import { validateCreateClient } from '../utils';
import { getClient } from '../../../database/connect';
import { userRoles, userStatuses, appLinks } from '../../../constants';

const crypto = require('crypto');

const createClient = async ({
  therapistId,
  therapyBackground,
  therapyGoals,
  therapistBio,
  therapistIntro,
  email,
  firstName,
  lastName,
  postcode,
  mobileNumber,
  contactNumber,
}) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');

    await validateCreateClient({
      therapyBackground,
      therapyGoals,
      therapistIntro,
      email,
      firstName,
      lastName,
      postcode,
      token,
    });

    // set up client as user
    const user = await User.createUser(
      {
        email,
        firstName,
        lastName,
        mobileNumber,
        contactNumber,
        roles: [userRoles.CLIENT],
        postcode,
        status: userStatuses.INVITED,
      },
      client,
    );

    // set up therapist client relationship
    const newClient = await TherapistClient.createClient(
      {
        clientId: user.id,
        therapistId,
        therapyBackground,
        therapyGoals,
        therapistBio,
        therapistIntro,
        inviteToken: token,
      },
      client,
    );

    const inviteLink = appLinks.CLIENT_SIGNUP_INVITE.replace(':invite', token);

    // send email
    events.emit(events.types.THERAPIST_CLIENT.CLIENT_INVITED, {
      therapistClientId: newClient.id,
    });

    await client.query('COMMIT');
    return { ...newClient, inviteLink };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default createClient;
