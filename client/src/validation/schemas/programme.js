import { fields, createSchema, validate as _validate } from '..';

const { description, content } = fields;

const descriptionSchema = createSchema({ description });
const programmeSchema = createSchema({ description, content });

const validate = (data) => {
  const { part } = data;

  switch (part) {
    case 'description':
      return _validate(descriptionSchema, data);
    case 'review':
      return _validate(programmeSchema, data);

    default:
      break;
  }
};

export default validate;
