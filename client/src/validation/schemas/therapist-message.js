import { fields, createSchema, validate as _validate } from '..';

const { requiredText } = fields;

const therapistMessage = {
  therapistMessage: requiredText,
};

const schema = createSchema(therapistMessage);

const validate = (data) => {
  return _validate(schema, data);
};

export default validate;
