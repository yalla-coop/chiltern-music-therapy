import { fields, createSchema, validate as _validate } from '..';

const { password } = fields;

const user = createSchema({
  password,
});

const validate = (data) => _validate(user, data);

export default validate;
