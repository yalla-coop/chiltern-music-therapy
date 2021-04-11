import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import * as Media from '../../media/model';
import * as Content from '../../content/model';

import events from '../../../services/events';

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

        const allCategories = await Content.findCategoriesByTherapist({
          id: userId,
        });
        const allCategoriesText = allCategories.map((cat) => cat.text);
        const oldCategories = await Content.findCategoriesByContent({
          id: _content.id,
        });
        const oldCategoriesText = oldCategories.map((cat) => cat.text);

        let newCategories = [];
        let categoriesToRemove = [];
        let remainingCategories = [];

        // for existing content -> find new categories and the ones to remove
        if (oldCategories.length > 0) {
          newCategories = categories.filter(
            (cat) => !oldCategoriesText.includes(cat),
          );

          categoriesToRemove = oldCategories.filter(
            (cat) => !categories.includes(cat.text),
          );

          // for new content, find new categories and remaining ones
        } else {
          newCategories = categories.filter(
            (cat) => !allCategoriesText.includes(cat),
          );

          remainingCategories = categories
            .map(
              (cat) =>
                !newCategories.includes(cat) &&
                allCategories.filter(({ text }) => text === cat)[0],
            )
            .filter((el) => !!el);
        }

        // FOR ALL NEW CATEGORIES: CREATE NEW CC AND CCC
        if (newCategories.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < newCategories.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const newCat = await Content.createCategory(
              {
                text: newCategories[i],
              },
              client,
            );
            // eslint-disable-next-line no-await-in-loop
            await Content.createContentCategory(
              {
                contentId: _content.id,
                catId: newCat.id,
              },
              client,
            );
          }
        }
        // FOR ALL REMAINING Cs ONLY ADD TO CONTENT
        if (remainingCategories.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < remainingCategories.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            // eslint-disable-next-line no-await-in-loop
            await Content.createContentCategory(
              {
                contentId: _content.id,
                catId: remainingCategories[i].id,
              },
              client,
            );
          }
        }

        // REMOVE ANY Cs from existing content
        if (categoriesToRemove.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < categoriesToRemove.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await Content.deleteContentCategoryById(
              categoriesToRemove[i].id,
              client,
            );
          }
        }
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
