import * as TherapistClient from '../use-cases';

const getMyTherapist = async (req, res, next) => {
  const { id } = req.user;

  try {
    const therapist = await TherapistClient.getMyTherapist({
      userId: id,
    });

    res.json(therapist);
  } catch (error) {
    next(error);
  }
};

export default getMyTherapist;
