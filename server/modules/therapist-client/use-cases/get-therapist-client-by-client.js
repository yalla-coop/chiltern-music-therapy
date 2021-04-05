import * as TherapistClient from '../model';

const findTherapistClientByClient = async ({ id }) => {
  return TherapistClient.findTherapistClientByClient({ id });
};

export default findTherapistClientByClient;
