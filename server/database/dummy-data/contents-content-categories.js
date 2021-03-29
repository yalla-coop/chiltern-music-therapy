import { query } from '../connect';

const createContentCategoriesContent = async ({ contentId, categoryId }) => {
  const sql = `
    INSERT INTO contents_content_categories(
      content_id,
      category_id
    )
      VALUES (
        $1,
        $2
      ) RETURNING *
  `;
  const res = await query(sql, [contentId, categoryId]);
  return res.rows[0];
};

const createContentCategoriesContents = async ({
  contents,
  contentCategories,
}) => {
  const content1Category1 = await createContentCategoriesContent({
    contentId: contents.content1.id,
    categoryId: contentCategories.category1.id,
  });
  const content1Category2 = await createContentCategoriesContent({
    contentId: contents.content1.id,
    categoryId: contentCategories.category2.id,
  });
  const content1Category3 = await createContentCategoriesContent({
    contentId: contents.content1.id,
    categoryId: contentCategories.category3.id,
  });

  return {
    content1Category1,
    content1Category2,
    content1Category3,
  };
};

export default createContentCategoriesContents;
