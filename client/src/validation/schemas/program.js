import { fields, createSchema, validate as _validate } from '..';

const { description } = fields;

const formData = {
  description,
};

const descriptionSchema = createSchema(formData);

const validate = (data) => {
  const { part } = data;
  if (part === 'description') {
    return _validate(descriptionSchema, data);
  }
  // TODO ADD content submit
};

export default validate;
