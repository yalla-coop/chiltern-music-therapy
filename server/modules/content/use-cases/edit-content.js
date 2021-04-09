import Boom from '@hapi/boom';
import * as Content from '../model';
import { userRoles as roles } from '../../../constants';
import { errorMsgs } from '../../../services/error-handler';

import { getClient } from '../../../database/connect';

import getLibraryContent from './get-library-content';

const deleteContent = async ({
  id,
  title,
  categories,
  instructions,
  role,
  userId,
}) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    // check content details
    const contentToEdit = await Content.findContentById(id, client);

    if (
      userId !== contentToEdit.therapistLibraryUserId &&
      ![roles.ADMIN, roles.SUPER_ADMIN].includes(role)
    ) {
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
    }

    await Content.editContent({ id, title, instructions }, client);

    // update categories
    const oldCategories = await Content.findCategoriesByContent({ id });
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
        const newCat = await Content.createCategory({ text: newCategories[i] });
        // eslint-disable-next-line no-await-in-loop
        await Content.createContentCategory({
          contentId: id,
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

    await client.query('COMMIT');

    // get updated library content
    const updatedContent = await getLibraryContent({ id: userId, role });
    return updatedContent;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default deleteContent;
