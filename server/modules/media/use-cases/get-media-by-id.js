import Boom from '@hapi/boom';
import * as Media from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getMediaById = async ({ id }) => {
  return Media.findContentById({ id });
};

export default getMediaById;
