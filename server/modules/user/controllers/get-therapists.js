import * as Users from '../use-cases';

const getTherapists = async (req, res, next) => {
  const { user } = req;

  try {
    const content = await Users.getTherapists({
      role: user.roles[0],
    });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export default getTherapists;
