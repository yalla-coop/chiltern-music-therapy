import Boom from '@hapi/boom';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import { errorMsgs } from '../../../services/error-handler';

import { validateCreateProgramme } from '../utils';

const createProgramme = async ({ userId, body }) => {
  // console.log(`reached§`, userId, body);

  try {
    const { clientId, description, content } = body;
    await validateCreateProgramme({ description, content });
    // get therapist_client_id
    const therapistClientId = await TherapistClients.findTherapistClientID({
      clientId,
      therapistId: userId,
    });
    console.log(`therapistClientId`, therapistClientId.id);

    // 1. create programmme using ther_cl_id / description / status - active -> return programme_id
  } catch (err) {
    console.log(`err`, err);
  }

  // FOR EACH ARRAY OBJ
  // 2. create media content using uploadFileInfo and user_id -> return media_id
  // 3. create contents using media_id (if there), title, instructions, link (if there), libraryC, therapistLibId  -> return content_id
  // 4. create programmes_contents using programme_id, content_id
  // 5. create categories
  // throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
};

export default createProgramme;
