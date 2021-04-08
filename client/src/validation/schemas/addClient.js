import { fields, createSchema, validate as _validate } from '..';

const {
  requiredText,
  postcodeLetters,
  optionalPhoneNumber,
  phoneNumber,
  email,
  goalsArrayAtLeastOne,
  biography,
  optionalCheckbox,
} = fields;

const addClient = createSchema({
  firstInitial: requiredText,
  secondInitial: requiredText,
  postcodeLetters,
  mobileNumber: optionalPhoneNumber,
  primaryMobileNumber: phoneNumber,
  email,
});

const step1Schema = createSchema({
  firstInitial: requiredText,
  secondInitial: requiredText,
  postcodeLetters,
});

const step2Schema = createSchema({
  mobileNumber: optionalPhoneNumber,
  primaryMobileNumber: phoneNumber,
  email,
});

const step3Schema = createSchema({
  background: requiredText,
  goals: goalsArrayAtLeastOne,
});

const step4Schema = createSchema({
  biography,
  useMeanBio: optionalCheckbox,
});

const step5Schema = createSchema({
  message: requiredText,
});

const validate = (data) => _validate(addClient, data);
export const step1 = (data) => _validate(step1Schema, data);
export const step2 = (data) => _validate(step2Schema, data);
export const step3 = (data) => _validate(step3Schema, data);
export const step4 = (data) => _validate(step4Schema, data);
export const step5 = (data) => _validate(step5Schema, data);

export default validate;
