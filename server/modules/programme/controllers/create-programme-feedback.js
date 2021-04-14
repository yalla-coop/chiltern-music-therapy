import * as Programmes from '../use-cases';

const createProgrammeFeedback = async (req, res, next) => {
  const { id: userId } = req.user;
  const {
    clearInstructions,
    problems,
    clearDemos,
    noDemos,
    enjoyableResources,
    likeMostAndLeast,
  } = req.body;
  const { id } = req.params;

  try {
    const feedback = await Programmes.createProgrammeFeedback({
      id,
      userId,
      clearInstructions,
      problems,
      clearDemos,
      noDemos,
      enjoyableResources,
      likeMostAndLeast,
    });

    res.json(feedback);
  } catch (error) {
    next(error);
  }
};

export default createProgrammeFeedback;
