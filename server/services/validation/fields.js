import { number, string, boolean, array, object } from 'yup';
import * as errMsgs from './err-msgs';

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

export const inviteToken = string()
  .length(8)
  .required(errMsgs.DEFAULT_REQUIRED);

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
    categories: array().of(string()).nullable(),
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
