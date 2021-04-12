import * as Content from '../model';
import { userRoles } from '../../../constants';
import { setContentsMediaFileUrl } from '../utils';

const getLibraryContent = async ({ id, role }) => {
  let contents = [];
  if ([userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(role)) {
    contents = await Content.findLibraryContentAdmin();
  }

  contents = await Content.findLibraryContent({ id });

  await setContentsMediaFileUrl(contents);

  return contents;
};

export default getLibraryContent;
