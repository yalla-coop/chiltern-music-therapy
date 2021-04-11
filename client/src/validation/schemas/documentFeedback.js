import { fields, createSchema, validate as _validate } from '..';

const { requiredText } = fields;

const videoFeedback = createSchema({
  message: requiredText,
});

const validate = (data) => _validate(videoFeedback, data);

export default validate;
