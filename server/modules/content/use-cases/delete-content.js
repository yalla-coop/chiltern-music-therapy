import Boom from '@hapi/boom';
import * as Content from '../model';
import { userRoles as roles } from '../../../constants';
import events from '../../../services/events';
import { errorMsgs } from '../../../services/error-handler';

import { getClient } from '../../../database/connect';

import getLibraryContent from './get-library-content';

const deleteContent = async ({ id, role, userId }) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    // check content details
    const contentToDelete = await Content.findContentById(id, client);

    if (
      userId !== contentToDelete.therapistLibraryUserId &&
      ![roles.ADMIN, roles.SUPER_ADMIN].includes(role)
    ) {
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
    }

    await Content.deleteContentCategories(id, client);
    await Content.deleteContentFromProgramme(id, client);
    await Content.deleteContentById(id, client);

    // check if media is used anywhere else. if not then delete
    events.emit(events.types.MEDIA.CONTENT_DELETED, {
      mediaId: contentToDelete.mediaId,
      contentId: id,
    });

    await client.query('COMMIT');

    // get updated library content
    const updatedContent = await getLibraryContent({ id: userId, role });
    return updatedContent;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default deleteContent;
