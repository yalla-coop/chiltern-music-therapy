import { fields, createSchema, validate as _validate } from '..';

const { requiredText, videoLink } = fields;

const videoUpdate = createSchema({
  link: videoLink,
  message: requiredText,
});

const validate = (data) => _validate(videoUpdate, data);

export default validate;
