import * as Content from '../use-cases';

const getContentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const content = await Content.getContentById({ id });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export default getContentById;
