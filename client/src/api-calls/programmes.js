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

// clientUserId is needed only for therapist and admin user
const getProgrammes = async ({ clientUserId } = {}) => {
  try {
    const { data } = await axios.get(`${PROGRAMMES_BASE}`, {
      params: { clientUserId },
    });
    return { data };
  } catch (error) {
    const err = handleError(error);
    return { error: err };
  }
};

const createProgramme = async (formData, { options } = {}) => {
  try {
    const { data } = await axios.post(`${PROGRAMMES_BASE}/create`, formData);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const editProgramme = async (formData, { options } = {}) => {
  try {
    const { data } = await axios.patch(`${PROGRAMMES_BASE}/update`, formData);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const sendFeedback = async ({
  clearInstructions,
  problems,
  clearDemos,
  noDemos,
  enjoyableResources,
  likeMostAndLeast,
  programmeId,
  options,
} = {}) => {
  try {
    const { data } = await axios.post(
      `${PROGRAMMES_BASE}/${programmeId}/feedback`,
      {
        clearInstructions,
        problems,
        clearDemos,
        noDemos,
        enjoyableResources,
        likeMostAndLeast,
      }
    );
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export {
  getProgrammeById,
  getProgrammes,
  createProgramme,
  editProgramme,
  sendFeedback,
};
