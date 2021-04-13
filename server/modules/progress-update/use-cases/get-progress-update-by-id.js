import Boom from '@hapi/boom';
import * as ProgressUpdate from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { userRoles, userStatuses } from '../../../constants';
import { setMediaFileUrl } from '../../../helpers';

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
        await setMediaFileUrl([progressUpdate]);
      }

      if (progressUpdate.client.status !== userStatuses.DELETED) {
        // eslint-disable-next-line prefer-destructuring
        progressUpdate.client.firstInitial = progressUpdate.client.firstName[0];
        delete progressUpdate.client.firstName;

        // eslint-disable-next-line prefer-destructuring
        progressUpdate.client.lastInitial = progressUpdate.client.lastName[0];
        delete progressUpdate.client.lastName;
      }

      break;

    default:
      break;
  }

  return progressUpdate;
};

export default getProgressUpdateById;
