import { getClient } from '../../../database/connect';
import * as Content from '../../content/model';

// TODO -> make this an event listener that reacts on category changes across the app

const manageCCC = async ({ userId, contentId, categories = [] }) => {
  // content.Id: _conten.tId
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const allCategories = await Content.findCategoriesByTherapist({
      id: userId,
    });
    const allCategoriesText = allCategories.map((cat) => cat.text);
    const oldCategories = await Content.findCategoriesByContent({
      id: contentId,
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
            contentId,
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
            contentId,
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
    await client.query('COMMIT');

    return;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default manageCCC;
