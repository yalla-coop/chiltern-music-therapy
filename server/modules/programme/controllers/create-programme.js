import * as Programme from '../use-cases';

const createProgramme = async (req, res, next) => {
  const { user, body } = req;

  try {
    const programme = await Programme.createProgramme({
      userId: user.id,
      body,
    });
    res.json(programme);
  } catch (error) {
    next(error);
  }
};

export default createProgramme;
