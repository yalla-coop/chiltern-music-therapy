import Boom from '@hapi/boom';
import * as ViewAccesses from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getViewAccessesById = async ({ id }) => {
  return ViewAccesses.findViewAccessesById({ id });
};

export default getViewAccessesById;
