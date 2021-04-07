import * as TherapistClient from '../use-cases';

const getClientById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    const client = await TherapistClient.getClientById({
      clientId: id,
      userId,
    });
    res.json(client);
  } catch (error) {
    next(error);
  }
};

export default getClientById;
