const htmlLink = (href, text) => {
  return `<a href="${href}">${text}</a>`;
};

const formateDate = (date) => {
  return date; // TODO: use moment
};

export { htmlLink, formateDate };
