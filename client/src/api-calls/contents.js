import axios from 'axios';
import handleError from './format-error';

const CONTENTS_BASE = '/contents';
const PROGRAMMES_BASE = '/programmes';

const getContentByProg = async ({ id, options }) => {
  try {
    const { data } = await axios.get(
      `${CONTENTS_BASE}/${PROGRAMMES_BASE}/${id}`
    );
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

const getCategories = async () => {
  try {
    const { data } = await axios.get(`${CONTENTS_BASE}/categories`);
    return { data };
  } catch (error) {
    const err = handleError(error);
    return { error: err };
  }
};

export { getContentByProg, getLibraryContent, getCategories };
