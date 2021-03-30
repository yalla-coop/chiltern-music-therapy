import Boom from '@hapi/boom';
import * as User from '../model';
import { userRoles as roles } from '../../../constants';

function deleteUser({ id, role }) {
  switch (role) {
    case roles.CLIENT:
      return User.deleteUserCredentials(id);

    default:
      throw Boom.forbidden();
  }
}

export default deleteUser;
