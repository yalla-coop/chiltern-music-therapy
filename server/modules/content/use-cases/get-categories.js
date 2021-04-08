import * as Content from '../model';
import { userRoles } from '../../../constants';

const getCategories = async ({ id, role }) => {
  if ([userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(role)) {
    return Content.findCategoriesAdmin();
  }

  return Content.findCategoriesByTherapist({ id });
};

export default getCategories;
