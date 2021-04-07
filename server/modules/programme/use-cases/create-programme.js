import Boom from '@hapi/boom';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';

import { validateCreateProgramme } from '../utils';

const createProgramme = async ({ userId, body }) => {
  // console.log(`reached§`, userId, body);
  const { clientId, description, content } = body;
  try {
    await validateCreateProgramme({ description, content });
  } catch (err) {
    console.log('ERRR', err);
  }

  // get therapist_client_id
  // 1. create programmme using ther_cl_id / description / status - active -> return programme_id
  // FOR EACH ARRAY OBJ
  // 2. create media content using uploadFileInfo and user_id -> return media_id
  // 3. create contents using media_id (if there), title, instructions, link (if there), libraryC, therapistLibId  -> return content_id
  // 4. create programmes_contents using programme_id, content_id
  // 5. create categories
  // throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
};

export default createProgramme;
