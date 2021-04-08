import * as TherapistClient from '../model';
import { userStatuses } from '../../../constants';

const getClientsByTherapist = async ({ id }) => {
  const clients = await TherapistClient.findClientsByTherapist(id);

  const protectedClients = clients.map((c) => {
    if (c.status === userStatuses.DELETED) {
      return {
        id: c.id,
        status: c.status,
      };
    }

    return {
      firstInitial: c.firstName[0],
      lastInitial: c.lastName[0],
      postcode: c.postcode,
      id: c.id,
      status: c.status,
    };
  });

  return protectedClients;
};

export default getClientsByTherapist;
