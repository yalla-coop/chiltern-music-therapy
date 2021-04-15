import * as ProgressUpdate from '../use-cases';

const getProgressUpdateById = async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id } = req.params;
  try {
    const progressUpdate = await ProgressUpdate.getProgressUpdateById({
      id,
      userId,
      role,
    });
    res.json(progressUpdate);
  } catch (error) {
    next(error);
  }
};

export default getProgressUpdateById;
