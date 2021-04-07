import * as TherapistClient from '../model';

const getMyTherapy = async ({ userId }) => {
  const myTherapy = await TherapistClient.findTherapyByClientId(userId);
  return myTherapy;
};

export default getMyTherapy;
