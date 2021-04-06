import { fields, createSchema, validate as _validate } from '..';

const { requiredText, postcodeLetters } = fields;

const addClient = createSchema({
  firstInitial: requiredText,
  secondInitial: requiredText,
  postcodeLetters,
});

const validate = (data) => _validate(addClient, data);

export default validate;
