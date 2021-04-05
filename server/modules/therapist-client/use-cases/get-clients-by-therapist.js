import * as TherapistClient from '../model';

const getClientsByTherapist = async ({ id }) => {
  return TherapistClient.findClientsByTherapist({ id });
};

export default getClientsByTherapist;
