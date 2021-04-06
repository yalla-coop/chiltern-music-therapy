import { fields, createSchema, validate as _validate } from '..';

const { description, content } = fields;

const descriptionSchema = createSchema({ description });
const contentSchema = createSchema({ content });

const validate = (data) => {
  const { part } = data;
  switch (part) {
    case 'description':
      return _validate(descriptionSchema, data);
    case 'review':
      return _validate(contentSchema, data);

    default:
      break;
  }
};

export default validate;
