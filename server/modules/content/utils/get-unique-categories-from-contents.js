const getUniqueCategoriesFromContents = (contents) => {
  let uniqueCategoriesTexts = [];

  contents.forEach(({ categories }) => {
    uniqueCategoriesTexts = new Set([...uniqueCategoriesTexts, ...categories]);
    // turn into array again
    uniqueCategoriesTexts = [...uniqueCategoriesTexts];
  });
  return uniqueCategoriesTexts;
};

export default getUniqueCategoriesFromContents;
