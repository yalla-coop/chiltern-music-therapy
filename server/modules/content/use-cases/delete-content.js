import Boom from '@hapi/boom';
import * as Content from '../model';
import { userRoles as roles } from '../../../constants';
import events from '../../../services/events';
import { errorMsgs } from '../../../services/error-handler';

import getLibraryContent from './get-library-content';

const deleteContent = async ({ id, role, userId, mode }, client) => {
  // check content details
  const contentToDelete = await Content.findContentById({ id }, client);

  if (
    userId !== contentToDelete.therapistLibraryUserId &&
    ![roles.ADMIN, roles.SUPER_ADMIN].includes(role)
  ) {
    throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
  }

  const delCats = await Content.deleteContentCategories(id, client);
  const delContProgramme = await Content.deleteContentFromProgramme(id, client);
  const delContent = await Content.deleteContentById(id, client);

  if (delCats && delContProgramme && delContent) {
    // check if media is used anywhere else. if not then delete
    events.emit(events.types.MEDIA.CONTENT_DELETED, {
      mediaId: contentToDelete.mediaId,
      contentId: id,
    });
  }

  // for library deletions page depends on updated content object
  // for remove from programme not
  if (mode === 'library') {
    const updatedContent = await getLibraryContent(
      { id: userId, role },
      client,
    );
    return updatedContent;
  }

  return 'success';
};

export default deleteContent;
