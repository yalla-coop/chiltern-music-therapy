import * as Programme from '../use-cases';

const createProgramme = async (req, res, next) => {
  const { user, body } = req;
  console.log(`body`, body);
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
