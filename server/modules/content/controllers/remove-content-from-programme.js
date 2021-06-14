import * as Content from '../use-cases';

const removeContentFromProgramme = async (req, res, next) => {
  const { user, query } = req;

  const { contentId, programmeId } = query;

  try {
    const updatedContent = await Content.removeContentFromProgramme({
      contentId,
      programmeId,
      userId: user.id,
      role: user.roles[0],
    });
    res.json(updatedContent);
  } catch (error) {
    next(error);
  }
};

export default removeContentFromProgramme;
