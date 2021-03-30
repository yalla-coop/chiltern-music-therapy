import axios from 'axios';
import handleError from './format-error';

const VIEW_ACCESSES_BASE = '/view-accesses';

const getViewAccessesById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${VIEW_ACCESSES_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getViewAccessesById };
