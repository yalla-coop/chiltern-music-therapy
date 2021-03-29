import * as User from '../model';

const getUserById = ({ id }) => {
  return User.findUserById(id);
};

export default getUserById;
