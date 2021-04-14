import * as Content from '../use-cases';

const deleteContent = async (req, res, next) => {
  const { user } = req;
  const { id } = req.query;
  try {
    const updatedContent = await Content.deleteContent({
      id,
      role: user.roles[0],
      userId: user.id,
      mode: 'library',
    });
    res.json(updatedContent);
  } catch (error) {
    next(error);
  }
};

export default deleteContent;
