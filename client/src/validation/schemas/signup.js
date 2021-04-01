import { fields, createSchema, validate as _validate } from '..';

import { roles } from './../../constants';

const { CLIENT, THERAPIST } = roles;

const { email, password, firstName, lastName, agreedOnTerms } = fields;

const client = createSchema({
  email,
  firstName,
  lastName,
  password,
  agreedOnTerms,
});

const therapist = createSchema({
  email,
  firstName,
  lastName,
  password,
  agreedOnTerms,
});

const validate = (data) => {
  if (data.role === CLIENT) return _validate(client, data);
  if (data.role === THERAPIST) return _validate(therapist, data);
};

export default validate;
