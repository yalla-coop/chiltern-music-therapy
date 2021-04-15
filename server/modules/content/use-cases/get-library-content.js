import * as Content from '../model';
import { userRoles } from '../../../constants';
import { setMediaFileUrl } from '../../../helpers';

const getLibraryContent = async ({ id, role }, client) => {
  let contents = [];
  if ([userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(role)) {
    contents = await Content.findLibraryContentAdmin(client);
  }

  contents = await Content.findLibraryContent({ id }, client);

  if (contents) {
    await setMediaFileUrl(contents);
  }

  return contents;
};

export default getLibraryContent;
