import * as TherapistClient from '../model';
import * as User from '../../user/model';

import events from '../../../services/events';

import { getClient } from '../../../database/connect';
import { userRoles } from '../../../constants';

const createClient = async ({
  therapistId,
  therapyBackground,
  therapyGoals,
  therapistBio,
  therapistIntro,
  inviteToken,
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

    // TO DO -> validate create client here

    // set up client as user
    const user = await User.createUser({
      email,
      firstName,
      lastName,
      mobileNumber,
      contactNumber,
      roles: [userRoles.CLIENT],
      postcode,
    });

    // set up therapist client relationship
    const newClient = await TherapistClient.createClient({
      clientId: user.id,
      therapistId,
      therapyBackground,
      therapyGoals,
      therapistBio,
      therapistIntro,
      inviteToken,
    });

    events.emit(events.types.THERAPIST_CLIENT.CLIENT_INVITED, user);
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
