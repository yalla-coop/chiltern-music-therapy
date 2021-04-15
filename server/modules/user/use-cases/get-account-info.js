import * as User from '../model';
import { userRoles as roles } from '../../../constants';
import { setMediaFileUrl } from '../../../helpers';

const getAccountInfo = async ({ id, role }) => {
  let account;
  if (role === roles.THERAPIST) {
    account = await User.findTherapistAccountInfo(id);
    await setMediaFileUrl([account], 'profileImage');

    return account;
  }
};

export default getAccountInfo;
