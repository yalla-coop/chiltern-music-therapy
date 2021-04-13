import { fields, createSchema, validate as _validate } from '..';

const { email, optionalPhoneNumber, requiredText } = fields;

const profile = createSchema({
  email,
  contactNumber: optionalPhoneNumber,
  bio: requiredText,
});

const validate = (data) => _validate(profile, data);

export default validate;
