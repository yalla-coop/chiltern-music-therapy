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

const sendUpdate = async ({ updates, options } = {}) => {
  try {
    /* the update should determine according to the user type */

    // const { data } = await axios.post(
    //   `${THERAPISTS_CLIENTS_BASE}/send-update`
    // )
    // return data;
    return { data: updates };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getProgressUpdatesById, sendUpdate };
