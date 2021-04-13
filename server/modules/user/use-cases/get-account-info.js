import * as User from '../model';
import { userRoles as roles } from '../../../constants';

const getAccountInfo = async ({ id, role }) => {
  if (role === roles.THERAPIST) {
    return User.findTherapistAccountInfo(id);
  }
};

export default getAccountInfo;
