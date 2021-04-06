import * as TherapistClient from '../../therapist-client/use-cases';

const getUserDashboard = async (req, res, next) => {
  const { user } = req;
  const role = user.roles[0];
  try {
    if (role === 'CLIENT') {
      const therapist = await TherapistClient.getTherapistByClient({
        id: user.id,
      });

      return res.json(therapist);
    }

    if (role === 'THERAPIST') {
      const clients = await TherapistClient.getClientsByTherapist({
        id: user.id,
      });

      return res.json(clients);
    }

    throw new Error(`Invalid role`);
  } catch (error) {
    next(error);
  }
};

export default getUserDashboard;
