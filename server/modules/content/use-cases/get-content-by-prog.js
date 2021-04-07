import Boom from '@hapi/boom';
import * as Content from '../model';
import * as Programme from '../../programme/use-cases';
import { errorMsgs } from '../../../services/error-handler';
import { userRoles } from '../../../constants/data-type';

const getContentByProg = async ({ id, userId, userRole }) => {
  // check if user is allowed
  const programme = await Programme.getProgrammeById({ id, userId, userRole });

  if (!programme) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  if (
    [programme.therapistUserId, programme.clientUserId].includes(userId) ||
    [userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(userRole)
  ) {
    return Content.findContentByProg(id);
  }
  throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
};

export default getContentByProg;
