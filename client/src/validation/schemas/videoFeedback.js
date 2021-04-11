import { fields, createSchema, validate as _validate } from '..';

const { requiredText, videoLink } = fields;

const videoFeedback = createSchema({
  link: videoLink,
  message: requiredText,
});

const validate = (data) => _validate(videoFeedback, data);

export default validate;
