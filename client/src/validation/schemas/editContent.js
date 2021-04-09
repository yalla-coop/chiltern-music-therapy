import { fields, createSchema, validate as _validate } from '..';

const { requiredText } = fields;

const editContent = createSchema({
  title: requiredText,
  instructions: requiredText,
});

const validate = (data) => _validate(editContent, data);

export default validate;
