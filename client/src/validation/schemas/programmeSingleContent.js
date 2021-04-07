import { fields, createSchema, validate as _validate } from '..';

const {
  title,
  categories,
  libraryContent,
  instructions,
  link,
  docContent,
} = fields;

const formData = {
  title,
  categories,
  libraryContent,
  instructions,
  link,
  docContent,
};

const schema = createSchema(formData);

const validate = (data) => {
  return _validate(schema, data);
};

export default validate;
