import axios from 'axios';
import handleError from './format-error';

const MEDIA_BASE = '/media';

const getMediaById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${MEDIA_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getMediaById };
