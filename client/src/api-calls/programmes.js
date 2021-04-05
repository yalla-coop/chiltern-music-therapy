import axios from 'axios';
import handleError from './format-error';

const PROGRAMMES_BASE = '/programmes';

const getProgrammeById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${PROGRAMMES_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getProgrammesByClient = async () => {
  try {
    const { data } = await axios.get(`${PROGRAMMES_BASE}`);
    return { data };
  } catch (error) {
    const err = handleError(error);
    return { error: err };
  }
};

export { getProgrammeById, getProgrammesByClient };
