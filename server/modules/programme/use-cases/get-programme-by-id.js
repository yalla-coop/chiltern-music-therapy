import Boom from '@hapi/boom';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getProgrammeById = async ({ id }) => {
  return Programme.findProgrammeById({ id });
};

export default getProgrammeById;
