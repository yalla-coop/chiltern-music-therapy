import Boom from '@hapi/boom';
import * as Content from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { getClient } from '../../../database/connect';
import deleteContent from './delete-content';

const removeContentFromProgramme = async ({
  contentId,
  programmeId,
  userId,
  role,
}) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const contentToDelete = await Content.findContentById(contentId, client);
    const programmeContent = await Content.findProgrammeContentId(
      {
        contentId,
        programmeId,
      },
      client,
    );
    const { libraryContent } = contentToDelete;

    // check if content is used in any programmes
    const programmesContents = await Content.findContentInProgrammes(
      contentId,
      client,
    );
    const programmesContentsIds = programmesContents.map(({ id }) => id);

    const alsoOtherProgrammes =
      programmesContentsIds.length > 1 &&
      programmesContentsIds.includes(programmeContent.id);
    const onlyThisProgramme =
      programmesContentsIds.length === 1 &&
      programmesContentsIds.includes(programmeContent.id);

    let _deleteContent;

    if (!contentToDelete || !programmeContent) {
      throw Boom.badData(errorMsgs.WRONG_DATA);
    }

    if (userId !== contentToDelete.therapistLibraryUserId) {
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
    }

    //  ERROR HANDLING IF NO PROGRAMMES FOR THAT CONTENT
    if (
      programmesContentsIds.length === 0 ||
      !programmesContentsIds.includes(programmeContent.id)
    ) {
      throw Boom.badData(errorMsgs.WRONG_DATA);
    }
    // IF NOT PART OF ANY OTHER PROGRAMMES AND NO LIBRARY CONTENT -> remove completely
    if (onlyThisProgramme && !libraryContent) {
      console.log('REACHED 1');
      _deleteContent = await deleteContent(
        { id: contentId, userId, role },
        client,
      );
      return _deleteContent;
    }
    // IF PART OF OTHER PROGRAMMES OR LIBRARY CONTENT -> ONLY REMOVE FROM THIS PROGRAMME ONLY
    if (alsoOtherProgrammes || libraryContent) {
      console.log('REACHED 2');
      _deleteContent = await Content.deleteContentFromProgrammeById(
        programmeContent.id,
        client,
      );
      return _deleteContent;
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default removeContentFromProgramme;
