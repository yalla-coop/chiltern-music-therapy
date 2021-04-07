import * as Programme from '../use-cases';

const getProgrammeById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const programme = await Programme.getProgrammeById({
      id,
      userId: user.id,
      userRole: user.roles[0],
    });
    res.json(programme);
  } catch (error) {
    next(error);
  }
};

export default getProgrammeById;
