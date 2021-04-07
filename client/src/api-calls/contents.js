import axios from 'axios';
import handleError from './format-error';

const CONTENTS_BASE = '/contents';

const getContentById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${CONTENTS_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getLibraryContent = async () => {
  try {
    const { data } = await axios.get(`${CONTENTS_BASE}/library`);
    return { data };
  } catch (error) {
    const err = handleError(error);
    return { error: err };
  }
};

export { getContentById, getLibraryContent };
