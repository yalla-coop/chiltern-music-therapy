import * as Programme from '../model';

const getProgrammesByClient = async ({ userId }) => {
  return Programme.findProgrammesByClient(userId);
};

export default getProgrammesByClient;
