import { getClient } from '../../../database/connect';
import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/model';
import * as Media from '../../media'
import { validateCreateProgramme } from '../utils';

const createProgramme = async ({ userId, body }) => {
  // console.log(`reached§`, userId, body);
  const client = await getClient();
  const { clientId, description, content } = body;
  await validateCreateProgramme({ description, content });
  try {
    await client.query('BEGIN');
    // get therapist_client_id
    const therapistClientId = await TherapistClients.findTherapistClientID(
      {
        clientId,
        therapistId: userId,
      },
      client,
    );

    // 1. create programmme using ther_cl_id / description / status - active -> return programme_id
    const programme = await Programme.createProgramme(
      {
        therapistsClientsId: therapistClientId.id,
        description,
      },
      client,
    );

    console.log('programme', programme.id);

    // FOR EACH ARRAY OBJ

      if(content.length > 0) {
        await Promise.all(
          content.map(({uploadedFileInfo}) => {
                // 2. create media content using uploadFileInfo and user_id -> return media_id
             if(uploadedFileInfo.uploadedToS3) {
               const media =
             }

      }


    await client.query('COMMIT');
  } catch (err) {
    console.log(`err`, err);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  // 3. create contents using media_id (if there), title, instructions, link (if there), libraryC, therapistLibId  -> return content_id
  // 4. create programmes_contents using programme_id, content_id
  // 5. create categories
  // throw Boom.conflict(errorMsgs.EMAIL_ALREADY_EXISTS, { field: 'email' });
};

export default createProgramme;
