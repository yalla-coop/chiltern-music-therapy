import Boom from '@hapi/boom';
import * as User from '../model';
import * as TherapistClients from '../../therapist-client/model';
import events from '../../../services/events';

import { hashPassword } from '../../../helpers';
import { errorMsgs } from '../../../services/error-handler';
import { validateSignup } from '../utils';

import { userRoles, userStatuses } from '../../../constants';

import { getClient } from '../../../database/connect';

const clientSignup = async ({ email, password, over16, inviteToken }) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    await validateSignup({
      email,
      password,
      over16,
      inviteToken,
      role: userRoles.CLIENT,
    });

    const userWithSameEmail = await User.findUserByEmail(email);
    if (userWithSameEmail) {
      throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
    }

    const clientUser = await TherapistClients.findClientByInviteToken(
      inviteToken,
      client,
    );

    if (!clientUser) {
      throw Boom.notFound(errorMsgs.INVALID_TOKEN);
    }

    if (clientUser.status !== userStatuses.INVITED) {
      throw Boom.badData(errorMsgs.INVALID_TOKEN);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.updateUserById(
      {
        id: clientUser.id,
        email,
        password: hashedPassword,
        over16,
        roles: [userRoles.CLIENT],
        status: userStatuses.ACTIVE,
      },
      client,
    );

    events.emit(events.types.USER.CLIENT_SIGNUP, user);
    await client.query('COMMIT');
    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default clientSignup;
