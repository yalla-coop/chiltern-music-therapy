import * as TherapistClient from '../use-cases';
import * as Programmes from '../../programme/use-cases';

const getClientDashboard = async (req, res, next) => {
  const { user } = req;
  try {
    const therapist = await TherapistClient.getTherapistByClient({
      id: user.id,
    });

    const programmes = await Programmes.getProgrammesByClient({
      userId: user.id,
    });

    res.json({ therapist, programmes });
  } catch (error) {
    next(error);
  }
};

export default getClientDashboard;
