import * as TherapistClient from '../../therapist-client/use-cases';
import * as Programmes from '../../programme/use-cases';

const getUserDashboard = async (req, res, next) => {
  const { user } = req;
  console.log('USER', user);
  const role = user.roles[0];
  try {
    if (role === 'CLIENT') {
      const therapist = await TherapistClient.getTherapistByClient({
        id: user.id,
      });

      const programmes = await Programmes.getProgrammesByClient({
        userId: user.id,
      });

      return res.json({ therapist, programmes });
    }

    if (role === 'THERAPIST') {
      const clients = await TherapistClient.getClientsByTherapist({
        id: user.id,
      });

      return res.json({ clients });
    }

    throw new Error(`Invalid role`);
  } catch (error) {
    next(error);
  }
};

export default getUserDashboard;
