import * as User from '../model';

const getTherapists = () => {
  return User.findTherapists();
};

export default getTherapists;
