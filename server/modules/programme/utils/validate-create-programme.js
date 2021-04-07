import {
  fields,
  createSchema,
  validate as _validate,
} from '../../../services/validation';

const { description, content } = fields;

const programmeSchema = createSchema({ description, content });

const validate = (data) => {
  console.log(`data`, data);
  return _validate(programmeSchema, data);
};

export default validate;
