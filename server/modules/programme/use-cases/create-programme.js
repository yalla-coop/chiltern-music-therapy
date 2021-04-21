import Boom from '@hapi/boom';
import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import * as Content from '../../content/model';

import { errorMsgs } from '../../../services/error-handler';

import events from '../../../services/events';

import createContent from '../../content/use-cases/create-content';
import createCategories from '../../content/use-cases/create-categories';
import manageCCC from './manage-content-contents-categories';

import { validateCreateEditProgramme } from '../utils';
import { getUniqueCategoriesFromContents } from '../../content/utils';

const createProgramme = async ({ userId, body }) => {
  const client = await getClient();
  const { clientId, description, content } = body;
  await validateCreateEditProgramme({ description, content });

  try {
    await client.query('BEGIN');

    // get therapist_client_id
    const therapistClientId = await TherapistClients.findTherapistClientID(
      {
        clientId,
        therapistId: userId,
      },
      client,
    );

    if (!therapistClientId.id) {
      throw Boom.badData(errorMsgs.WRONG_DATA);
    }

    // create programme
    const programme = await Programme.createProgramme(
      {
        therapistsClientsId: therapistClientId.id,
        description,
      },
      client,
    );

    const uniqueCategoriesTexts = getUniqueCategoriesFromContents(content);

    const newCategories = await createCategories(
      {
        texts: uniqueCategoriesTexts,
      },
      client,
    );

    const promises = [];

    const contentIdsCategoriesIdsPairs = {
      contentsIds: [],
      categoriesIds: [],
    };

    const allUpdatedContentsIds = [];

    content.forEach((contentData) => {
      const fn = async () => {
        const {
          libraryContent,
          title,
          instructions,
          categories,
          therapistUserId,
          id: contentId,
        } = contentData;

        let _content;

        if (therapistUserId) {
          _content = await Content.updateContentById(
            {
              contentId,
              title,
              instructions,
              libraryContent,
            },
            client,
          );
        } // for new content -> add to db
        else {
          _content = await createContent({
            programmeId: programme.id,
            userId,
            contentData,
          });
        }

        // create programmes_contents
        await Programme.createProgrammesContent(
          {
            programmeId: programme.id,
            contentId: _content.id,
          },
          client,
        );

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

    events.emit(events.types.PROGRAMME.CREATED, {
      programmeId: programme.id,
    });

    return 'success';
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default createProgramme;
