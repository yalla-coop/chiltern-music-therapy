import Boom from '@hapi/boom';
import * as TherapistClients from '../model';
import { errorMsgs } from '../../../services/error-handler';

const editTherapistClientById = async ({
  clientId,
  userId,
  therapyGoals,
  therapyBackground,
}) => {
  const client = await TherapistClients.findClientByUserId(clientId);

  if (!client) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  if (client.therapistUserId !== userId) {
    throw Boom.unauthorized();
  }

  const updated = await TherapistClients.editTherapistClientById({
    clientId,
    therapyGoals,
    therapyBackground,
  });

  return updated;
};

export default editTherapistClientById;
