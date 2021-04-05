import axios from 'axios';
import handleError from './format-error';

const THERAPISTS_CLIENTS_BASE = '/therapist-clients';

const getTherapistsClientsById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${THERAPISTS_CLIENTS_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getMyTherapist = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${THERAPISTS_CLIENTS_BASE}/my-therapist`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getTherapistsClientsById, getMyTherapist };
