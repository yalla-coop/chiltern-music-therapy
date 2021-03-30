import * as TherapistClient from '../use-cases';

const getTherapistClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const therapistClient = await TherapistClient.getTherapistClientById({
      id,
    });
    res.json(therapistClient);
  } catch (error) {
    next(error);
  }
};

export default getTherapistClientById;
