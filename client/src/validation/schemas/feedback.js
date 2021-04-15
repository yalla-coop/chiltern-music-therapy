import { fields, createSchema, validate as _validate } from '..';

const {
  numberField,
  optionalText,
  libraryContent,
  optionalRate,
  requiredText,
} = fields;

// Q1
const q1Schema = createSchema({
  rate: numberField,
  problems: optionalText,
});

const q1validate = (data) => _validate(q1Schema, data);

// Q2

const q2Schema = createSchema({
  rate: optionalRate,
  noDemos: libraryContent,
});

const q2validate = (data) => _validate(q2Schema, data);

// Q3

const q3Schema = createSchema({
  rate: numberField,
});

const q3validate = (data) => _validate(q3Schema, data);

// Q4

const q4Schema = createSchema({
  likeMostAndLeast: requiredText,
});

const q4validate = (data) => _validate(q4Schema, data);

export default { q1validate, q2validate, q3validate, q4validate };
