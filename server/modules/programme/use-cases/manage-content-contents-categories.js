import * as Content from '../../content/model';

const manageCCC = async (
  {
    contentIdsCategoriesIdsPairs: { contentsIds, categoriesIds },
    allUpdatedContentsIds,
  },
  client,
) => {
  let createdAndUpdatedCCC;
  if (categoriesIds.length) {
    createdAndUpdatedCCC = await Content.createContentsContentCategory(
      {
        categoriesIds,
        contentsIds,
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
