import { query } from '../connect';

const createContentCategory = async ({ text }) => {
  const sql = `
    INSERT INTO content_categories(text)
      VALUES ($1) RETURNING *
  `;
  const res = await query(sql, [text]);
  return res.rows[0];
};

const createContentCategories = async () => {
  const category1 = await createContentCategory({ text: 'category1' });
  const category2 = await createContentCategory({ text: 'category2' });
  const category3 = await createContentCategory({ text: 'category3' });

  return {
    category1,
    category2,
    category3,
  };
};

export default createContentCategories;
