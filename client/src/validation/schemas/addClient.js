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
  firstName: requiredText,
  lastName: requiredText,
  postcodeLetters,
  mobileNumber: optionalPhoneNumber,
  primaryMobileNumber: phoneNumber,
  email,
});

const step1Schema = createSchema({
  firstName: requiredText,
  lastName: requiredText,
  postcodeLetters,
});

const step2Schema = createSchema({
  mobileNumber: optionalPhoneNumber,
  primaryMobileNumber: phoneNumber,
  email,
});

const step3Schema = createSchema({
  therapyBackground: requiredText,
  therapyGoals: goalsArrayAtLeastOne,
});

const step4Schema = createSchema({
  therapistBio: biography,
  useMainBio: optionalCheckbox,
});

const step5Schema = createSchema({
  therapistIntro: requiredText,
});

const validate = (data) => _validate(addClient, data);
export const step1 = (data) => _validate(step1Schema, data);
export const step2 = (data) => _validate(step2Schema, data);
export const step3 = (data) => _validate(step3Schema, data);
export const step4 = (data) => _validate(step4Schema, data);
export const step5 = (data) => _validate(step5Schema, data);

export default validate;
