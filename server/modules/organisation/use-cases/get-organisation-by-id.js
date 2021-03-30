import Boom from '@hapi/boom';
import * as Organisation from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getOrganisationById = async ({ id }) => {
  return Organisation.findOrganisationById({ id });
};

export default getOrganisationById;
