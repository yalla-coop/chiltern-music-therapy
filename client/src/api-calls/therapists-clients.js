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

const getClientById = async ({ id, options } = {}) => {
  try {
    const { data } = await axios.get(`${THERAPISTS_CLIENTS_BASE}/client/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const updateTherapiesProfile = async ({ updates, options } = {}) => {
  try {
    // const { data } = await axios.post(
    //   `${THERAPISTS_CLIENTS_BASE}/update-therapies-profile`
    // )
    // return data;
    return { data: updates };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const addNewClient = async ({ state, options } = {}) => {
  try {
    // const { data } = await axios.post(
    //   `${THERAPISTS_CLIENTS_BASE}/add-new-client`
    // )
    // return data;
    return { data: { state, inviteToken: 'http://bit.ly/afjwlejfafjla' } };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getMyTherapy = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${THERAPISTS_CLIENTS_BASE}/my-therapy`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const sendFeedback = async ({ updates, options } = {}) => {
  try {
    // const { data } = await axios.post(
    //   `${THERAPISTS_CLIENTS_BASE}/send-feedback`
    // )
    // return data;
    return { data: updates };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};
export {
  getTherapistsClientsById,
  getTherapistByInviteToken,
  getMyTherapist,
  getClientById,
  updateTherapiesProfile,
  getMyTherapy,
  addNewClient,
  sendFeedback,
};
