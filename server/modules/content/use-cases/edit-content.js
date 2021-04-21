import Boom from '@hapi/boom';
import * as Content from '../model';
import { userRoles as roles } from '../../../constants';
import { errorMsgs } from '../../../services/error-handler';

import { getClient } from '../../../database/connect';

import getLibraryContent from './get-library-content';
import events from '../../../services/events';

import createCategories from './create-categories';
import manageCCC from '../../programme/use-cases/manage-content-contents-categories';

const editContent = async ({
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
    const contentToEdit = await Content.findContentById({ id }, client);

    if (
      userId !== contentToEdit.therapistLibraryUserId &&
      ![roles.ADMIN, roles.SUPER_ADMIN].includes(role)
    ) {
      throw Boom.unauthorized(errorMsgs.UNAUTHORISED_EDIT);
    }

    await Content.editContent({ id, title, instructions }, client);

    const newCategories = await createCategories(
      {
        texts: categories,
      },
      client,
    );

    const contentIdsCategoriesIdsPairs = {
      contentsIds: [],
      categoriesIds: [],
    };

    newCategories
      .filter(({ text }) => categories.includes(text))
      .forEach(({ id: _id }) => {
        contentIdsCategoriesIdsPairs.categoriesIds.push(_id);
        contentIdsCategoriesIdsPairs.contentsIds.push(id);
      });

    await manageCCC(
      {
        allUpdatedContentsIds: [id], // just one content
        contentIdsCategoriesIdsPairs,
      },
      client,
    );

    await client.query('COMMIT');

    events.emit(events.types.CONTENT.UPDATED, {
      contentId: id,
    });

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

export default editContent;
