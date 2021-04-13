import Boom from '@hapi/boom';
import * as ProgressUpdate from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { userRoles } from '../../../constants';

const getProgressUpdateById = async ({ id, userId, role }) => {
  let progressUpdate;
  switch (role) {
    case userRoles.THERAPIST:
      progressUpdate = await ProgressUpdate.findProgressUpdateById(id);
      if (!progressUpdate) {
        throw Boom.notFound(errorMsgs.NOT_FOUND);
      }

      if (progressUpdate.therapistClient.therapistUserId !== userId) {
        throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
      }

      if (progressUpdate.therapistClient.therapistUserId !== userId) {
        throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
      }

      if (progressUpdate.file && progressUpdate.file.id) {
        // get file url
      }
      break;

    default:
      break;
  }

  return progressUpdate;
};

export default getProgressUpdateById;
