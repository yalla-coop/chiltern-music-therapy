import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import * as Media from '../../media/model';
import * as Content from '../../content/model';

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
        const oldCategories = await Content.findCategoriesByContent({
          id: _content.id,
        });
        const oldCategoriesText = oldCategories.map((cat) => cat.text);
        const newCategories = categories.filter(
          (cat) => !oldCategoriesText.includes(cat),
        );
        const categoriesToRemove = oldCategories.filter(
          (cat) => !categories.includes(cat.text),
        );

        // add new categories
        if (newCategories.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < newCategories.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const newCat = await Content.createCategory({
              text: newCategories[i],
            });
            // eslint-disable-next-line no-await-in-loop
            await Content.createContentCategory({
              contentId: _content.id,
              catId: newCat.id,
            });
          }
        }

        // remove categories
        if (categoriesToRemove.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < categoriesToRemove.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await Content.deleteContentCategoryById(categoriesToRemove[i].id);
          }
        }
      },
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default createProgramme;

// create new categories (all the ones without an id attached)
// let addedCategories = [];

// const newCategoryTexts = categories
//   .filter((el) => !el.categoryId)
//   .map((el) => el.value);

// if (newCategoryTexts.length > 0) {
//   newCategoryTexts.forEach((text) => {
//     addedCategories.push(
//       Content.createContentCategory({ text }, client),
//     );
//   });
//   addedCategories = await Promise.all(addedCategories);
// }

// const allProgrammeCC = categories
//   .filter((el) => el.categoryId)
//   .concat(addedCategories)
//   .map((el) => el.categoryId);

// // create contents_content_categories
// const addedContentsContentCategories = [];
// if (allProgrammeCC.length > 0) {
//   allProgrammeCC.forEach((_categoryId) => {
//     addedContentsContentCategories.push(
//       Content.createContentCategoriesContent(
//         { contentId: _content.id, categoryId: _categoryId },
//         client,
//       ),
//     );
//   });
//   await Promise.all(addedContentsContentCategories);
// }
