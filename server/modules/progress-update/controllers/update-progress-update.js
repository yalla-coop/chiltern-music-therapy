import * as ProgressUpdate from '../use-cases';

const updateProgressUpdate = async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { therapistMessage } = req.body;
  const { id } = req.params;
  try {
    const progressUpdate = await ProgressUpdate.updateProgressUpdate({
      id,
      therapistMessage,
      userId,
      role,
    });
    res.json(progressUpdate);
  } catch (error) {
    next(error);
  }
};

export default updateProgressUpdate;
