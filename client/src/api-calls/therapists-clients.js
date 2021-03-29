import axios from 'axios';
import handleError from './format-error';

const THERAPISTS_CLIENTS_BASE = '/progress-updates';

const getTherapistsClientsById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${THERAPISTS_CLIENTS_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getTherapistsClientsById };
