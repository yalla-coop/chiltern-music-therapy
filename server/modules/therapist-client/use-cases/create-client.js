import * as TherapistClient from '../model';
import * as User from '../../user/model';

import events from '../../../services/events';
import { validateCreateClient } from '../utils';
import { getClient } from '../../../database/connect';
import { userRoles, userStatuses } from '../../../constants';

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

    console.log('everything', {
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
    });

    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');

    // TO DO -> validate create client here
    const res = await validateCreateClient({
      therapyBackground,
      therapyGoals,
      therapistIntro,
      email,
      firstName,
      lastName,
      postcode,
      token,
    });

    console.log('RES', res);

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

    console.log('user', user);

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

    events.emit(events.types.THERAPIST_CLIENT.CLIENT_INVITED, newClient);
    await client.query('COMMIT');
    return newClient;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default createClient;
