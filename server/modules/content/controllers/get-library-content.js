import * as Content from '../use-cases';

const getLibraryContent = async (req, res, next) => {
  const { user } = req;
  try {
    const content = await Content.getLibraryContent({
      id: user.id,
      role: user.roles[0],
    });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

export default getLibraryContent;
