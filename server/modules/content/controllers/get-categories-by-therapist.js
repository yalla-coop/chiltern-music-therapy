import * as Content from '../use-cases';

const getCategoriesByTherapist = async (req, res, next) => {
  const { user } = req;
  try {
    const content = await Content.getCategoriesByTherapist({ id: user.id });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export default getCategoriesByTherapist;
