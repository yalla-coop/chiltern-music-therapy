import Boom from '@hapi/boom';
import * as Content from '../model';
import { errorMsgs } from '../../../services/error-handler';
import deleteContent from './delete-content';
import getLibraryContent from './get-library-content';
import { getClient } from '../../../database/connect';
import events from '../../../services/events';

const removeContentFromLibrary = async ({ id, userId, role }) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');
    // check content details
    const contentToDelete = await Content.findContentById({ id }, client);

    if (userId !== contentToDelete.therapistLibraryUserId) {
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
    }

    // check if content is used in any programmes
    const programmes = await Content.findContentInProgrammes(
      { contentId: id },
      client,
    );
    let contentDeleted = false;
    let updatedLibraryContent;
    // if no programmes then remove completely
    if (!programmes || programmes.length === 0) {
      await deleteContent({ id, userId, role, mode: 'library' }, client);
      contentDeleted = true;
    } else {
      await Content.removeContentFromLibrary({ id }, client);
      // get updated contents from database
      updatedLibraryContent = await getLibraryContent(
        { id: userId, role },
        client,
      );
    }

    await client.query('COMMIT');

    if (contentDeleted) {
      // check if media is used anywhere else. if not then delete
      events.emit(events.types.MEDIA.CONTENT_DELETED, {
        mediaId: contentToDelete.mediaId,
        contentId: id,
      });
    }

    return updatedLibraryContent;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default removeContentFromLibrary;
