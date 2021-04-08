import { fields, createSchema, validate as _validate } from '..';

const { email } = fields;

const user = createSchema({
  email,
});

const validate = (data) => _validate(user, data);

export default validate;
