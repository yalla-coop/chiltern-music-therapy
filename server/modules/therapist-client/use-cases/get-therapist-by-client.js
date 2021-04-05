import * as TherapistClient from '../model';

const getTherapistByClient = async ({ id }) => {
  return TherapistClient.findTherapistByClient(id);
};

export default getTherapistByClient;
