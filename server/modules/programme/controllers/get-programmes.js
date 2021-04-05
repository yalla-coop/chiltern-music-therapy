import * as Programmes from '../use-cases';

const getProgrammes = async (req, res, next) => {
  const { user } = req;

  try {
    const programmes = await Programmes.getProgrammes({
      userId: user.id,
      role: user.role,
    });
    res.json(programmes);
  } catch (error) {
    next(error);
  }
};

export default getProgrammes;
