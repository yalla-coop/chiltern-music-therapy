import * as TherapistClient from '../use-cases';

const editClientById = async (req, res, next) => {
  const { clientId, therapyGoals, therapyBackground } = req.body;
  const { id: userId } = req.user;
  try {
    const client = await TherapistClient.editClientById({
      clientId,
      userId,
      therapyBackground,
      therapyGoals,
    });
    res.json(client);
  } catch (error) {
    next(error);
  }
};

export default editClientById;
