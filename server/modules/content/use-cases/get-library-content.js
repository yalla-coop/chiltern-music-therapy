import * as Content from '../model';
import { userRoles } from '../../../constants';
import { setMediaFileUrl } from '../../../helpers';

const getLibraryContent = async ({ id, role }) => {
  let contents = [];
  if ([userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(role)) {
    contents = await Content.findLibraryContentAdmin();
  }

  contents = await Content.findLibraryContent({ id });

  await setMediaFileUrl(contents);

  return contents;
};

export default getLibraryContent;
