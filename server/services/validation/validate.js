import { errorMsgs } from '../error-handler';

const validate = (schema, data, { abortEarly = false, ...options } = {}) => {
  try {
    const validData = schema.validateSync(data, {
      abortEarly,
      ...options,
    });
    return { data: validData };
  } catch (error) {
    throw new errorMsgs.VALIDATION_ERROR(error);
  }
};

export default validate;
