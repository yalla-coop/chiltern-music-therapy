import moment from 'moment';

const htmlLink = (href, text) => {
  return `<a href="${href}">${text}</a>`;
};

const formateDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export { htmlLink, formateDate };
