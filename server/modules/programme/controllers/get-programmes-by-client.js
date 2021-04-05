import * as Programmes from '../use-cases';

const getProgrammesByClient = async (req, res, next) => {
  const { user } = req;

  try {
    const programmes = await Programmes.getProgrammesByClient({
      userId: user.id,
    });
    res.json(programmes);
  } catch (error) {
    next(error);
  }
};

export default getProgrammesByClient;
