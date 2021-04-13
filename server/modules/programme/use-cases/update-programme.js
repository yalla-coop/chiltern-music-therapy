import Boom from '@hapi/boom';
import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';
import * as Content from '../../content/model';

import events from '../../../services/events';

import createProgrammeContent from './create-programme-content';
import manageCCC from './manage-content-contents-categories';

import { validateCreateEditProgramme } from '../utils';

const updateProgramme = async ({ userId, body }) => {
  const client = await getClient();
  const { programmeId, description, programmeContents } = body;
  await validateCreateEditProgramme({
    description,
    content: programmeContents,
  });

  try {
    await client.query('BEGIN');

    const programmeToEdit = await Programme.findProgrammeById({
      id: programmeId,
    });

    if (!programmeToEdit.id) {
      throw Boom.badData(errorMsgs.WRONG_DATA);
    }

    // update description if it has changed
    if (programmeToEdit.description !== description) {
      await Programme.updateProgrammeById(
        {
          programmeId,
          description,
        },
        client,
      );
    }

    // manage contents

    await programmeContents.forEach(async (contentData) => {
      const {
        libraryContent,
        title,
        instructions,
        categories,
        therapistUserId,
        existingContent = false,
        id: contentId,
      } = contentData;

      let _content;

      // check if content exists and update accordingly
      if (existingContent && therapistUserId) {
        _content = await Content.updateContentById(
          {
            contentId,
            title,
            instructions,
            libraryContent,
          },
          client,
        );
      }
      // for new content -> add to db
      else {
        // create media content if present
        _content = await createProgrammeContent({
          programmeId,
          userId,
          contentData,
        });
      }
      // update categories
      await manageCCC({ userId, contentId: _content.id, categories });
    });

    await client.query('COMMIT');

    events.emit(events.types.PROGRAMME.UPDATED, {
      programmeId,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default updateProgramme;
