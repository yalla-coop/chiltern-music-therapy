import * as Content from '../use-cases';

const editContent = async (req, res, next) => {
  const { user } = req;
  const { id, title, categories, instructions } = req.body;

  console.log('STUFF', id, title, categories, instructions);
  try {
    const updatedContent = await Content.editContent({
      id,
      title,
      categories,
      instructions,
      role: user.roles[0],
      userId: user.id,
    });
    res.json(updatedContent);
  } catch (error) {
    next(error);
  }
};

export default editContent;
