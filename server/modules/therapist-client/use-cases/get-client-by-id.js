import Boom from '@hapi/boom';
import * as TherapistClients from '../model';
import { errorMsgs } from '../../../services/error-handler';
import { userStatuses } from '../../../constants';

const getClientById = async ({ clientId, userId }) => {
  const client = await TherapistClients.findClientByUserId(clientId);

  if (!client) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  if (client.therapistUserId !== userId) {
    throw Boom.unauthorized();
  }

  const { firstName, lastName } = client;

  if (client.status !== userStatuses.DELETED) {
    // eslint-disable-next-line prefer-destructuring
    client.firstInitial = firstName[0];
    delete client.firstName;

    // eslint-disable-next-line prefer-destructuring
    client.lastInitial = lastName[0];
    delete client.lastName;

    client.postcode = (client.postcode && client.postcode.slice(0, 2)) || '';
  }

  return client;
};

export default getClientById;
