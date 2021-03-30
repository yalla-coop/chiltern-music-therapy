import Boom from '@hapi/boom';
import * as Content from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getContentById = async ({ id }) => {
  return Content.findContentById({ id });
};

export default getContentById;
