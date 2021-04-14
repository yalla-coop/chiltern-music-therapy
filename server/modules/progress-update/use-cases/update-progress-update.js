import Boom from '@hapi/boom';
import moment from 'moment';
import * as ProgressUpdate from '../model';

import events from '../../../services/events';

import { userRoles } from '../../../constants';
import { errorMsgs } from '../../../services/error-handler';

const updateProgressUpdate = async ({ id, therapistMessage, userId, role }) => {
  let progressUpdate;
  switch (role) {
    case userRoles.THERAPIST:
      progressUpdate = await ProgressUpdate.findProgressUpdateById(id);
      if (
        progressUpdate &&
        progressUpdate.therapistClient.therapistUserId === userId
      ) {
        await ProgressUpdate.updateProgressUpdate({
          id,
          therapistMessage,
          therapistMessageDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        events.emit(events.types.PROGRESS_UPDATE.THERAPIST_RESPOND, {
          progressId: progressUpdate.id,
        });
      } else {
        throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
      }
      break;

    default:
      break;
  }
};

export default updateProgressUpdate;
