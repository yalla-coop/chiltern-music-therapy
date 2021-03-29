import axios from 'axios';
import handleError from './format-error';

const MEDIAS_BASE = '/medias';

const getMediaById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${MEDIAS_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getMediaById };
