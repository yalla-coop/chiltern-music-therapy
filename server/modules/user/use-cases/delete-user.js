import Boom from '@hapi/boom';
import * as User from '../model';
import { userRoles as roles } from '../../../constants';
import events from '../../../services/events';

const deleteUser = async ({ id, role }) => {
  switch (role) {
    case roles.CLIENT:
      await User.deleteUserDetails(id);
      // email
      // progress update
      // media
      // s3

      events.emit(events.types.USER.CLIENT_DELETED, { userId: id });
      break;

    default:
      throw Boom.forbidden();
  }
};

export default deleteUser;
