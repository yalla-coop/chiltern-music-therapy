import { fields, createSchema, validate as _validate } from '..';

const { requiredText, goalsArrayAtLeastOne } = fields;

const editClient = createSchema({
  therapyBackground: requiredText,
  therapyGoals: goalsArrayAtLeastOne,
});

const validate = (data) => _validate(editClient, data);

export default validate;
