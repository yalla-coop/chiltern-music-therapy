import Boom from '@hapi/boom';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { userRoles } from '../../../constants/data-type';

const getProgrammeById = async ({ id, userId, userRole }) => {
  const programme = await Programme.findProgrammeById({ id });

  if (!programme) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  if (
    [programme.therapistUserId, programme.clientUserId].includes(userId) ||
    [userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(userRole)
  ) {
    return programme;
  }
  throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
};

export default getProgrammeById;
