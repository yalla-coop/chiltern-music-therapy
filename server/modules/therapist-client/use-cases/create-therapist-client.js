import uniqid from 'uniqid';

import * as TherapistClient from '../model';
import * as User from '../../user/model';

import events from '../../../services/events';
import { validateCreateClient } from '../utils';
import { getClient } from '../../../database/connect';
import { userRoles, userStatuses, appLinks } from '../../../constants';

const createTherapistClient = async ({
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

    const token = uniqid.time();

    await validateCreateClient({
      therapyBackground,
      therapyGoals,
      therapistIntro,
      email,
      firstName: firstName[0],
      lastName: lastName[0],
      postcode,
      token,
    });

    // set up client as user
    const user = await User.createUser(
      {
        email,
        firstName: firstName[0],
        lastName: lastName[0],
        mobileNumber,
        contactNumber,
        roles: [userRoles.CLIENT],
        postcode,
        status: userStatuses.INVITED,
      },
      client,
    );

    // set up therapist client relationship
    const newTherapistClient = await TherapistClient.createTherapistClient(
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
      therapistClientId: newTherapistClient.id,
    });

    await client.query('COMMIT');
    return { ...newTherapistClient, inviteLink };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default createTherapistClient;
