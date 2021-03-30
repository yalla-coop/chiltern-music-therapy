import Boom from '@hapi/boom';
import * as TherapistClient from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getTherapistClientById = async ({ id }) => {
  return TherapistClient.findTherapistClientById({ id });
};

export default getTherapistClientById;
