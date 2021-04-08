import Boom from '@hapi/boom';
import * as User from '../model';
import { errorMsgs } from '../../../services/error-handler';

const checkUserExists = async ({ data, type }) => {
  if (type === 'email') {
    const userWithSameEmail = await User.findUserByEmail(data.email);
    if (userWithSameEmail) {
      throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
    }
  }
  // Put other duplicate values you want to test here
};

export default checkUserExists;
