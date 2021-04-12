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

  const content2Category1 = await createContentCategoriesContent({
    contentId: contents.content2.id,
    categoryId: contentCategories.category1.id,
  });
  const content3Category1 = await createContentCategoriesContent({
    contentId: contents.content3.id,
    categoryId: contentCategories.category1.id,
  });
  const content4Category1 = await createContentCategoriesContent({
    contentId: contents.content4.id,
    categoryId: contentCategories.category1.id,
  });

  return {
    content1Category1,
    content1Category2,
    content1Category3,
    content2Category1,
    content3Category1,
    content4Category1,
  };
};

export default createContentCategoriesContents;
