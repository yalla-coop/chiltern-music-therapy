import { string, number, boolean, array } from 'yup';
import * as errMsgs from './err-msgs';
import './custom-functions';

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
  .max(100, errMsgs.TOO_LONG_MAX_100)
  .required(errMsgs.DEFAULT_REQUIRED)
  .typeError(errMsgs.DEFAULT_REQUIRED);

export const password = string()
  .matches(
    /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)(?=.{8,}).*$/,
    errMsgs.SHORT_PASSWORD
  )
  .required(errMsgs.DEFAULT_REQUIRED);

export const loginPassword = string().required(errMsgs.DEFAULT_REQUIRED);

export const postcode = string()
  .required(errMsgs.DEFAULT_REQUIRED)
  .min(6, errMsgs.TOO_SHORT_MIN_5)
  .max(8, errMsgs.TOO_LONG_MAX_7)
  .matches(
    /\b(([a-z][0-9]{1,2})|(([a-z][a-hj-y][0-9]{1,2})|(([a-z][0-9][a-z])|([a-z][a-hj-y][0-9]?[a-z])))) [0-9][a-z]{2}\b/gi,
    errMsgs.INVALID_POSTCODE
  );

export const agreedOnTerms = boolean()
  .oneOf([true], errMsgs.SHOULD_AGREE_ON_TERMS)
  .required(errMsgs.DEFAULT_REQUIRED);

export const agreedAge = boolean()
  .oneOf([true], errMsgs.AGREED_AGE)
  .required(errMsgs.DEFAULT_REQUIRED);

export const arrayOfIds = array()
  .of(number())
  .min(1)
  .required(errMsgs.DEFAULT_REQUIRED)
  .typeError(errMsgs.DEFAULT_REQUIRED);

export const optionalText = string()
  .typeError(errMsgs.DEFAULT_REQUIRED)
  .nullable();

export const urlRequired = string()
  .matches(
    /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#.-]+)*\/?(\?[a-zA-Z0-9-_.-]+=[a-zA-Z0-9-%?&=.-]+&?)?$/,
    {
      message: errMsgs.INVALID_LINK,
    }
  )
  .required(errMsgs.DEFAULT_REQUIRED);

export const inviteToken = string()
  .length(8)
  .required(errMsgs.DEFAULT_REQUIRED);

export const optionalPhoneNumber = string().when((value, schema) => {
  if (value) {
    return schema.phone().typeError(errMsgs.INVALID_PHONE);
  }
  return schema.nullable();
});

export const postcodeLetters = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(2)
  .required(errMsgs.DEFAULT_REQUIRED);
