import * as TherapistClient from '../use-cases';

const getMyTherapy = async (req, res, next) => {
  const { id } = req.user;
  try {
    const myTherapy = await TherapistClient.getMyTherapy({
      userId: id,
    });

    res.json(myTherapy);
  } catch (error) {
    next(error);
  }
};

export default getMyTherapy;
