import axios from 'axios';
import handleError from './format-error';

const PROGRESS_UPDATES_BASE = '/progress-updates';

const getProgressUpdatesById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${PROGRESS_UPDATES_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const sendUpdate = async ({
  uploadedFileInfo,
  clientMessage,
  link,
  programmeId,
  type,
  options,
} = {}) => {
  try {
    const { data } = await axios.post(`${PROGRESS_UPDATES_BASE}`, {
      uploadedFileInfo,
      clientMessage,
      link,
      programmeId,
      type,
    });
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getProgressUpdatesById, sendUpdate };
