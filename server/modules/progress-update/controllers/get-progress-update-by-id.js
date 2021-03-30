import * as ProgressUpdate from '../use-cases';

const getProgressUpdateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const progressUpdate = await ProgressUpdate.getProgressUpdateById({ id });
    res.json(progressUpdate);
  } catch (error) {
    next(error);
  }
};

export default getProgressUpdateById;
