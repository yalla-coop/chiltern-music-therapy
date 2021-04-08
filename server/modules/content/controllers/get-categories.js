import * as Content from '../use-cases';

const getCategories = async (req, res, next) => {
  const { user } = req;
  try {
    const content = await Content.getCategories({
      id: user.id,
      role: user.roles[0],
    });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export default getCategories;
