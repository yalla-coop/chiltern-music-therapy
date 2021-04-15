import Boom from '@hapi/boom';
import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';
import * as Content from '../../content/model';

import events from '../../../services/events';

import createProgrammeContent from '../../content/use-cases/create-content';
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
    await Promise.all(
      programmeContents.map(async (contentData) => {
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

        // check if content already exists and if part of programme and only update
        if (existingContent || therapistUserId) {
          _content = await Content.updateContentById(
            {
              contentId,
              title,
              instructions,
              libraryContent,
            },
            client,
          );
          // if content is part of library but not of programme -> add
          if (!existingContent) {
            // create programmes_contents
            await Programme.createProgrammesContent(
              {
                programmeId,
                contentId: _content.id,
              },
              client,
            );
          }
        }
        // for new content -> add to db and to programme
        else {
          // create media content if present
          _content = await createProgrammeContent({
            programmeId,
            userId,
            contentData,
          });

          // create programmes_contents
          await Programme.createProgrammesContent(
            {
              programmeId,
              contentId: _content.id,
            },
            client,
          );
        }
        // FOR ALL
        // update categories
        await manageCCC({ userId, contentId: _content.id, categories }, client);
      }),
    );

    await client.query('COMMIT');

    events.emit(events.types.PROGRAMME.UPDATED, {
      programmeId,
    });

    return 'success';
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default updateProgramme;
