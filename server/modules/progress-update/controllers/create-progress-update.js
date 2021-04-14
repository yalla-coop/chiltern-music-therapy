import * as ProgressUpdate from '../use-cases';

const createProgressUpdate = async (req, res, next) => {
  const { id: userId } = req.user;
  const { uploadedFileInfo, clientMessage, link, programmeId, type } = req.body;
  try {
    const progressUpdate = await ProgressUpdate.createProgressUpdate({
      uploadedFileInfo,
      clientMessage,
      link,
      programmeId,
      type,
      userId,
    });
    res.json(progressUpdate);
  } catch (error) {
    next(error);
  }
};

export default createProgressUpdate;
