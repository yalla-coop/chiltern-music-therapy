import * as TherapistClient from '../../therapist-client/use-cases';
import * as Programmes from '../../programme/use-cases';

const getUserDashboard = async (req, res, next) => {
  const { user } = req;
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

      const protectedClients = clients.map((c) => ({
        firstInitial: c.firstName[0],
        lastInitial: c.lastName[0],
        postcode: c.postcode,
        id: c.id,
      }));

      return res.json(protectedClients);
    }

    throw new Error(`Invalid role`);
  } catch (error) {
    next(error);
  }
};

export default getUserDashboard;
