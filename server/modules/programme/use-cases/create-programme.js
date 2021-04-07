import Boom from '@hapi/boom';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';

const createProgramme = async ({ userId, body }) => {
  // get therapist_client_id
  //
  // throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
};

export default createProgramme;
