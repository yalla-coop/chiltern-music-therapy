import * as TherapistClient from '../use-cases';

const getMyTherapist = async (req, res, next) => {
  // const { id } = req.user;
  const id = 1;
  try {
    const therapist = await TherapistClient.getMyTherapist({
      userId: id,
    });

    console.log(therapist);
    res.json(therapist);
  } catch (error) {
    next(error);
  }
};

export default getMyTherapist;
