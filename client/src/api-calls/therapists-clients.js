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

const getTherapistByInviteToken = async ({ inviteToken, options }) => {
  try {
    const { data } = await axios.get(
      `${THERAPISTS_CLIENTS_BASE}/token/${inviteToken}`
    );
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getMyTherapy = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${THERAPISTS_CLIENTS_BASE}/my-therapy`);
    console.log({ data });
    return { data };
  } catch (error) {
    console.log({ error });
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getTherapistsClientsById, getTherapistByInviteToken, getMyTherapy };
