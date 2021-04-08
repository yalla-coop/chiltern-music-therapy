import {
  fields,
  createSchema,
  validate as _validate,
} from '../../../services/validation';

const {
  email,
  firstName,
  lastName,
  inviteToken,
  postcodeLetters,
  requiredText,
  goalsArrayAtLeastOne,
} = fields;

const createUser = createSchema({
  firstName,
  lastName,
  email,
  token: inviteToken,
  postcode: postcodeLetters,
  therapyBackground: requiredText,
  therapistIntro: requiredText,
  therapyGoals: goalsArrayAtLeastOne,
});

const validate = (data) => {
  console.log('REAC', data);
  return _validate(createUser, data);
};

export default validate;
