import Boom from '@hapi/boom';
import * as User from '../model';
import { errorMsgs } from '../../../services/error-handler';

const checkUserExists = async ({ data, fields }) => {
  if (fields.includes('email')) {
    const userWithSameEmail = await User.findUserByEmail(data.email);
    if (userWithSameEmail) {
      throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
    }
  }
  if (fields.includes('primaryMobileNumber')) {
    const userWithSamePhone = await User.findUserByMainPhone(
      data.primaryMobileNumber,
    );
    if (userWithSamePhone) {
      throw Boom.conflict(errorMsgs.PHONE_ALREADY_EXISTS, {
        field: 'primaryMobileNumber',
      });
    }
  }
  // Put other duplicate values you want to test here
};

export default checkUserExists;
