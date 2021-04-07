import Boom from '@hapi/boom';
import * as TherapistClients from '../model';

const authorizeClientToTherapist = async ({ clientId, therapistId }) => {
  const therapistClient = await TherapistClients.findTherapistClientByClientId(
    clientId,
  );

  if (!therapistClient) {
    throw Boom.unauthorized();
  }

  if (Number(therapistClient.therapistUserId) !== Number(therapistId)) {
    throw Boom.unauthorized();
  }

  return therapistClient;
};

export default authorizeClientToTherapist;
