import Boom from '@hapi/boom';
import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';
import * as Content from '../../content/model';

import events from '../../../services/events';

import createContent from '../../content/use-cases/create-content';
import createCategories from '../../content/use-cases/create-categories';
import manageCCC from './manage-content-contents-categories';

import { validateCreateEditProgramme } from '../utils';
import { getUniqueCategoriesFromContents } from '../../content/utils';

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

    const contentIdsCategoriesIdsPairs = {
      contentsIds: [],
      categoriesIds: [],
    };

    // const createdCategoriesIds = [];
    // const contentsIdsToUpdateCategories = [];
    const allUpdatedContentsIds = [];

    const uniqueCategoriesTexts = getUniqueCategoriesFromContents(
      programmeContents,
    );

    const newCategories = await createCategories(
      {
        texts: uniqueCategoriesTexts,
      },
      client,
    );

    // manage contents
    const promises = [];

    programmeContents.forEach((contentData) => {
      const fn = async () => {
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
          _content = await createContent(
            {
              programmeId,
              userId,
              contentData,
            },
            client,
          );

          // create programmes_contents
          await Programme.createProgrammesContent(
            {
              programmeId,
              contentId: _content.id,
            },
            client,
          );
        }

        newCategories
          .filter(({ text }) => categories.includes(text))
          .forEach(({ id }) => {
            contentIdsCategoriesIdsPairs.categoriesIds.push(id);
            contentIdsCategoriesIdsPairs.contentsIds.push(_content.id);
          });

        allUpdatedContentsIds.push(_content.id);
      };
      promises.push(fn());
    });

    await Promise.all(promises);

    await manageCCC(
      {
        allUpdatedContentsIds,
        contentIdsCategoriesIdsPairs,
      },
      client,
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
