import { fields, createSchema, validate as _validate } from '..';

const { requiredText } = fields;

const documentUpdate = createSchema({
  message: requiredText,
});

const validate = (data) => _validate(documentUpdate, data);

export default validate;
