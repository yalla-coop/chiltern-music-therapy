import * as Content from '../model';
import { userRoles } from '../../../constants';

const getLibraryContent = async ({ id, role }) => {
  if ([userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(role)) {
    return Content.findLibraryContentAdmin();
  }
  return Content.findLibraryContent({ id });
};

export default getLibraryContent;
