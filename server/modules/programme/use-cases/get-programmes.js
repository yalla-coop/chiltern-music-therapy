import * as Programme from '../model';
import { userRoles } from '../../../constants';

const getProgrammes = async ({ userId, role }) => {
  switch (role) {
    case userRoles.CLIENT:
      return Programme.findProgrammesByClient(userId);

    default:
      break;
  }
};

export default getProgrammes;
