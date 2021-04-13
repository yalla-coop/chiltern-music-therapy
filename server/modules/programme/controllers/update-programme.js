import * as Programme from '../use-cases';

const updateProgramme = async (req, res, next) => {
  const { user, body } = req;

  try {
    const programme = await Programme.updateProgramme({
      userId: user.id,
      body,
    });
    res.json(programme);
  } catch (error) {
    next(error);
  }
};

export default updateProgramme;
