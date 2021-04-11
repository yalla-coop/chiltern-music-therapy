import Boom from '@hapi/boom';
import * as Content from '../model';
import * as Programme from '../../programme/use-cases';
import { errorMsgs } from '../../../services/error-handler';
import { userRoles } from '../../../constants/data-type';
import { getFilePreSignedUrl } from '../../../services/files-storage';

const getContentByProg = async ({ id, userId, userRole }) => {
  // check if user is allowed
  const programme = await Programme.getProgrammeById({ id, userId, userRole });
  let contents;
  if (!programme) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  if (
    [programme.therapistUserId, programme.clientUserId].includes(userId) ||
    [userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(userRole)
  ) {
    contents = await Content.findContentByProg(id);

    const promises = [];

    contents.forEach((content) => {
      if (content.file && content.file.id) {
        const getLink = async () => {
          const url = await getFilePreSignedUrl({
            key: content.file.key,
            bucket: content.file.bucket,
          });

          // eslint-disable-next-line no-param-reassign
          content.file.url = url;
        };

        promises.push(getLink());
      }
    });

    await Promise.all(promises);

    return contents;
  }
  throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
};

export default getContentByProg;
