import * as Programme from '../use-cases';

const getProgrammeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const programme = await Programme.getProgrammeById({ id });
    res.json(programme);
  } catch (error) {
    next(error);
  }
};

export default getProgrammeById;
