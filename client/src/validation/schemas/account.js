import { fields, createSchema, validate as _validate } from '..';

import { roles } from './../../constants';

const { CLIENT, THERAPIST } = roles;

const { email, firstName, lastName, requiredText, phoneNumber } = fields;

const client = createSchema({
  email,
  firstName,
  lastName,
});

const therapist = createSchema({
  email,
  firstName,
  lastName,
  bio: requiredText,
  contactEmail: email,
  contactNumber: phoneNumber,
});

const validate = (data) => {
  if (data.role === CLIENT) return _validate(client, data);
  if (data.role === THERAPIST) return _validate(therapist, data);
};

export default validate;
