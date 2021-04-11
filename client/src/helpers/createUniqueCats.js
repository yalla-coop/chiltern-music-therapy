const createUniqueCats = (data) => {
  const uniqueCats = [...new Set(data.map(({ text }) => text))];
  const allCats = uniqueCats.map((cat) => ({
    label: cat,
    value: cat,
  }));
  return allCats;
};

export default createUniqueCats;
