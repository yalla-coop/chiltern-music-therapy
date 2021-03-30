import Boom from '@hapi/boom';
import * as User from '../model';
import events from '../../../services/events';

import { hashPassword } from '../../../helpers';
import { errorMsgs } from '../../../services/error-handler';
import { validateSignup } from '../utils';

import { getClient } from '../../../database/connect';

const clientSignup = async ({ email, password }) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    await validateSignup({
      email,
      password,
      a: '',
    });

    const userWithSameEmail = await User.findUserByEmail(email);
    if (userWithSameEmail) {
      throw Boom.conflict(errorMsgs.EMAIL_ALREADY_USED, { field: 'email' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.createUser(
      {
        email,
        password: hashedPassword,
      },
      client,
    );

    events.emit(events.types.user.CLIENT_SIGNUP, user);
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
