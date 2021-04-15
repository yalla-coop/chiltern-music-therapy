import Boom from '@hapi/boom';
import * as Content from '../model';
import { errorMsgs } from '../../../services/error-handler';
import deleteContent from './delete-content';
import getLibraryContent from './get-library-content';

const removeContentFromLibrary = async ({ id, userId, role }) => {
  // check content details
  const contentToDelete = await Content.findContentById(id);

  if (userId !== contentToDelete.therapistLibraryUserId) {
    throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
  }

  // check if content is used in any programmes
  const programmes = await Content.findContentInProgrammes(id);

  // if no programmes then remove completely
  if (!programmes || programmes.length === 0) {
    await deleteContent({ id, userId, role, mode: 'library' });
    return;
  }
  await Content.removeContentFromLibrary(id);

  // get updated contents from database
  const updatedLibraryContent = await getLibraryContent({ id: userId, role });
  return updatedLibraryContent;
};

export default removeContentFromLibrary;
