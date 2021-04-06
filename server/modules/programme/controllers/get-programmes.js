import * as Programmes from '../use-cases';

const getProgrammes = async (req, res, next) => {
  const { user } = req;
  const { clientUserId } = req.query;

  try {
    const programmes = await Programmes.getProgrammes({
      userId: user.id,
      role: user.role,
      clientUserId,
    });
    res.json(programmes);
  } catch (error) {
    next(error);
  }
};

export default getProgrammes;
