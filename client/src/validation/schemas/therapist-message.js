import { fields, createSchema, validate as _validate } from '..';

const { optionalText } = fields;

const therapistMessage = {
  therapistMessage: optionalText,
};

const schema = createSchema(therapistMessage);

const validate = (data) => {
  return _validate(schema, data);
};

export default validate;
