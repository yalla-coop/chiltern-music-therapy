import Boom from '@hapi/boom';
import * as User from '../model';
import { userRoles as roles } from '../../../constants';
import events from '../../../services/events';

const deleteUser = async ({ id, role }) => {
  let deletedUser;

  switch (role) {
    case roles.CLIENT:
      deletedUser = await User.deleteUserDetails(id);
      events.emit(events.types.USER.CLIENT_DELETED, deletedUser);
      break;

    default:
      throw Boom.forbidden();
  }
};

export default deleteUser;
