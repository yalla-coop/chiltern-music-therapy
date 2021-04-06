import * as TherapistClient from '../model';

const getClientsByTherapist = async ({ id }) => {
  const clients = await TherapistClient.findClientsByTherapist(id);

  const protectedClients = clients.map((c) => ({
    firstInitial: c.firstName[0],
    lastInitial: c.lastName[0],
    postcode: c.postcode,
    id: c.id,
  }));

  return protectedClients;
};

export default getClientsByTherapist;
