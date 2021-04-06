import * as Content from '../use-cases';

const getContentByProg = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const content = await Content.getContentByProg({
      id,
      userId: user.id,
      userRole: user.roles[0],
    });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export default getContentByProg;
