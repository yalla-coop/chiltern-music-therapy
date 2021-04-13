import Boom from '@hapi/boom';
import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import * as Content from '../../content/model';

import { errorMsgs } from '../../../services/error-handler';

import events from '../../../services/events';

import createProgrammeContent from './create-programme-content';
import ManageCCC from './manage-content-contents-categories';

import { validateCreateEditProgramme } from '../utils';

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

    // create programmme
    const programme = await Programme.createProgramme(
      {
        therapistsClientsId: therapistClientId.id,
        description,
      },
      client,
    );

    // store content
    await content.forEach(async (contentData) => {
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
        // create media content if present
        _content = await createProgrammeContent({
          programmeId: programme.id,
          userId,
          contentData,
        });
      }

      // update categories
      await ManageCCC({ userId, contentId: _content.id, categories });
    });

    await client.query('COMMIT');

    events.emit(events.types.PROGRAMME.CREATED, {
      programmeId: programme.id,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default createProgramme;
