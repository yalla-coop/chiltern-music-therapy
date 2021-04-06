import Boom from '@hapi/boom';
import * as Content from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getContentByProg = async ({ id, userId, userRole }) => {
  const contents = await Content.findContentByProg(id);

  console.log('CONTENT', contents);
  return contents;
};

export default getContentByProg;
