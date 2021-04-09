import * as Content from '../use-cases';

const removeContentFromLibrary = async (req, res, next) => {
  const { user } = req;
  const { id } = req.body;
  try {
    console.log('CONTROLLER', user, id);
    const updatedContent = await Content.removeContentFromLibrary({
      id,
      role: user.roles[0],
      userId: user.id,
    });
    res.json(updatedContent);
  } catch (error) {
    next(error);
  }
};

export default removeContentFromLibrary;
