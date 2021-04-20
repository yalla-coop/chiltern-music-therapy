import * as Content from '../model';

const createCategories = async ({ texts }, client) => {
  if (texts.length) {
    const newCategories = await Content.createCategories(
      {
        texts,
      },
      client,
    );

    return newCategories;
  }
};

export default createCategories;
