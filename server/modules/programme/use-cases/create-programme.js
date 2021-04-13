import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import * as Media from '../../media/model';
import * as Content from '../../content/model';

import events from '../../../services/events';
import ManageCCC from './manage-content-contents-categories';

import { validateCreateProgramme, matchMediaTypes } from '../utils';

const createProgramme = async ({ userId, body }) => {
  const client = await getClient();
  const { clientId, description, content } = body;
  await validateCreateProgramme({ description, content });

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

    // create programmme
    const programme = await Programme.createProgramme(
      {
        therapistsClientsId: therapistClientId.id,
        description,
      },
      client,
    );

    // store content
    await content.forEach(
      async ({
        libraryContent,
        title,
        instructions,
        link,
        docContent,
        uploadedFileInfo,
        type,
        categories,
        therapistUserId,
        id: contentId,
      }) => {
        let _media;
        let _content;

        // create media content if present
        if (uploadedFileInfo && uploadedFileInfo.uploadedToS3) {
          const {
            name,
            key,
            bucket,
            bucketRegion,
            size,
            fileType,
          } = uploadedFileInfo;

          _media = await Media.createMedia(
            {
              fileName: name,
              fileType,
              size,
              key,
              bucket,
              bucketRegion,
              createdBy: userId,
            },
            client,
          );
        }

        // if existing library content only run update else create new
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
        } else {
          // create content
          _content = await Content.createContent(
            {
              mediaId: _media && _media.id,
              title,
              instructions,
              link,
              docContent,
              libraryContent,
              therapistLibraryUserId: userId,
              type: matchMediaTypes(type),
            },
            client,
          );
        }

        // create programmes_contents
        await Programme.createProgrammesContent(
          {
            programmeId: programme.id,
            contentId: _content.id,
          },
          client,
        );

        // update categories
        await ManageCCC({ userId, contentId: _content.id, categories });
      },
    );

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
