import * as Programme from '../use-cases';

const getProgrammeById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  console.log("id", id)
  try {
    const programme = await Programme.getProgrammeById({
      id,
      userId: user.id,
      userRole: user.roles[0],
    });

    console.log("progr", programme)
    res.json(programme);
  } catch (error) {
    next(error);
  }
};

export default getProgrammeById;
