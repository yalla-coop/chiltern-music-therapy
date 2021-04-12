import moment from 'moment';

const dateFormatter = (date) => {
  return moment(date).format('DD MMMM YYYY');
};

export const dateFormatterDay = (date) => {
  return moment(date).format('DD');
};

export const dateFormatterMonthYeah = (date) => {
  return moment(date).format('MMMM YYYY');
};

export default dateFormatter;
