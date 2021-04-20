import * as Content from '../../content/model';

const manageCCC = async (
  {
    createdCategoriesIds,
    allUpdatedContentsIds,
    contentsIdsToUpdateCategories,
  },
  client,
) => {
  let createdAndUpdatedCCC;
  if (createdCategoriesIds.length) {
    createdAndUpdatedCCC = await Content.createContentsContentCategory(
      {
        categoriesIds: createdCategoriesIds,
        contentsIds: contentsIdsToUpdateCategories,
      },
      client,
    );
  }

  await Content.deleteUnusedContentsContentCategoryByContentIds(
    {
      updatedContentsIds: allUpdatedContentsIds,
      CCCIdsToKeep:
        (createdAndUpdatedCCC && createdAndUpdatedCCC.map(({ id }) => id)) ||
        [],
    },
    client,
  );
};

export default manageCCC;
