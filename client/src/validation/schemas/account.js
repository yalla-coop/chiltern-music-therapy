import { fields, createSchema, validate as _validate } from '..';

import { roles } from './../../constants';

const { CLIENT, THERAPIST } = roles;

const { email, firstName, lastName, requiredText } = fields;

const client = createSchema({
  email,
  firstName,
  lastName,
});

const therapist = createSchema({
  email,
  firstName,
  lastName,
  biography: requiredText,
  contactEmail: email,
});

const validate = (data) => {
  if (data.role === CLIENT) return _validate(client, data);
  if (data.role === THERAPIST) return _validate(therapist, data);
};

export default validate;
