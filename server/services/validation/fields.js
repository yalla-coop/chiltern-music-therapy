import { number, string, boolean, array, object } from 'yup';
import * as errMsgs from './err-msgs';

export const requiredText = string().required(errMsgs.DEFAULT_REQUIRED);

export const firstName = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(20)
  .required(errMsgs.DEFAULT_REQUIRED);

export const lastName = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(20)
  .required(errMsgs.DEFAULT_REQUIRED);

export const email = string()
  .email(errMsgs.INVALID_EMAIL)
  .required(errMsgs.DEFAULT_REQUIRED);

export const password = string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
    errMsgs.SHORT_PASSWORD,
  )
  .required(errMsgs.DEFAULT_REQUIRED);

export const id = number()
  .min(1)
  .required(errMsgs.DEFAULT_REQUIRED)
  .typeError(errMsgs.DEFAULT_REQUIRED);

export const inviteToken = string().required(errMsgs.DEFAULT_REQUIRED);

export const over16 = boolean()
  .oneOf([true, false], errMsgs.AGREED_AGE)
  .required(errMsgs.DEFAULT_REQUIRED);

export const description = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(500)
  .required(errMsgs.DEFAULT_REQUIRED);

export const content = array().of(
  object().shape({
    title: string()
      .min(1, errMsgs.DEFAULT_REQUIRED)
      .max(50)
      .required(errMsgs.DEFAULT_REQUIRED),
    categories: array().of(string().nullable()).nullable(),
    libraryContent: boolean()
      .oneOf([true, false])
      .required(errMsgs.DEFAULT_REQUIRED),
    instructions: string()
      .min(1, errMsgs.DEFAULT_REQUIRED)
      .max(1000)
      .required(errMsgs.DEFAULT_REQUIRED),
    type: string().required(errMsgs.DEFAULT_REQUIRED),
    link: string().nullable(),
    docContent: string().nullable(),
    uploadedFileInfo: object().shape({
      bucket: string(),
      bucketRegion: string(),
      fileType: string(),
      size: number(),
      id: string().nullable(),
      key: string(),
      name: string(),
      new: boolean().oneOf([true, false]),
      uploadedToS3: boolean().oneOf([true, false]),
    }),
  }),
);

export const optionalPhoneNumber = string().when((value, schema) => {
  if (value) {
    return schema.phone().typeError(errMsgs.INVALID_PHONE);
  }
  return schema.nullable();
});

export const phoneNumber = string()
  .required(errMsgs.DEFAULT_REQUIRED)
  .when((value, schema) => {
    return schema.phone().typeError(errMsgs.INVALID_PHONE);
  });

export const postcodeLetters = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(2, errMsgs.AT_MOST_TWO_LETTERS)
  .required(errMsgs.DEFAULT_REQUIRED);

export const goalsArrayAtLeastOne = array()
  .of(
    object().shape({
      goal: string().required(errMsgs.DEFAULT_REQUIRED),
      category: string().required(errMsgs.DEFAULT_REQUIRED),
    }),
  )
  .test('goals', errMsgs.AT_LEAST_ADD_ONE, (goals) => {
    return goals.some((goal) => goal.goal && goal.category);
  })
  .test('goals', errMsgs.All_required, (goals) => {
    return goals.length === 1
      ? true
      : goals.every((goal) => goal.goal && goal.category);
  });

export const optionalText = string()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .nullable();

export const biography = string().when('useMeanBio', {
  is: false,
  then: requiredText,
  otherwise: optionalText,
});

export const optionalCheckbox = boolean()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .nullable();
