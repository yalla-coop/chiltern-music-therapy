import { fields, createSchema, validate as _validate } from '..';

const { description, content } = fields;

const descriptionSchema = createSchema({ description });
const programSchema = createSchema({ description, content });

const validate = (data) => {
  const { part } = data;

  switch (part) {
    case 'description':
      return _validate(descriptionSchema, data);
    case 'review':
      console.log(`data`, data);
      return _validate(programSchema, data);

    default:
      break;
  }
};

export default validate;
