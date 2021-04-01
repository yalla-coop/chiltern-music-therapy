import moment from 'moment';

const dateFormatter = (date) => {
  return moment(date).format('DD MMMM YYYY');
};

export default dateFormatter;
