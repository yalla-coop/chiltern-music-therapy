import axios from 'axios';
import handleError from './format-error';

const CONTENTS_BASE = '/contents';

const getContentByProgId = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${CONTENTS_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getContentByProgId };
