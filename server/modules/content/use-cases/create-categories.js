import * as Content from '../model';

const createCategories = async ({ texts }, client) => {
  const _texts = texts.filter((text) => !!text);
  if (_texts.length) {
    const newCategories = await Content.createCategories(
      {
        texts: _texts,
      },
      client,
    );

    return newCategories;
  }
  return [];
};

export default createCategories;
