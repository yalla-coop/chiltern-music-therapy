import { string, number, boolean, array, object } from 'yup';
import * as errMsgs from './err-msgs';

const URLregex = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#.-]+)*\/?(\?[a-zA-Z0-9-_.-]+=[a-zA-Z0-9-%?&=.-]+&?)?$/;

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

// SINGLE CONTENT FIELDS
export const title = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(50)
  .required(errMsgs.DEFAULT_REQUIRED);

export const categories = array().of(string()).nullable();

export const libraryContent = boolean()
  .oneOf([true, false])
  .required(errMsgs.DEFAULT_REQUIRED);

export const instructions = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(1000)
  .required(errMsgs.DEFAULT_REQUIRED);

export const contentInput = object().shape(
  {
    // link: string().when(
    //   ['docContent', 'fileUploaded', 'category'],
    //   (docContent, fileUploaded, category) => {
    //     if (['audio', 'video'].includes(category)) {
    //       if (!fileUploaded) {
    //         string()
    //           .matches(URLregex, {
    //             message: errMsgs.INVALID_LINK,
    //           })
    //           .required(errMsgs.DEFAULT_REQUIRED);
    //       } else {
    //         string().notRequired();
    //       }
    //     } else {
    //       if (!fileUploaded && !docContent.length) {
    //         string()
    //           .matches(URLregex, {
    //             message: errMsgs.INVALID_LINK,
    //           })
    //           .required(errMsgs.DEFAULT_REQUIRED);
    //       } else {
    //         string().notRequired();
    //       }
    //     }
    //   }
    // ),

    // docContent: string()
    //   .notRequired()
    //   .when(
    //     ['fileUploaded', 'link', 'category'],
    //     (fileUploaded, link, category) => {
    //       console.log(`reached`);
    //       if (category === 'document') {
    //         return !fileUploaded && !link.length
    //           ? string().required(errMsgs.DEFAULT_REQUIRED)
    //           : string().notRequired();
    //       } else {
    //         return string().notRequired();
    //       }
    //     }
    //   ),

    // link: string().when('link', (link) => {
    //   return link && link.length
    //     ? string()
    //         .matches(URLregex, {
    //           message: errMsgs.INVALID_LINK,
    //         })
    //         .required(errMsgs.DEFAULT_REQUIRED)
    //     : string().notRequired();
    // }),
    // link: string().required(errMsgs.DEFAULT_REQUIRED),
    docContent: string().required(errMsgs.DEFAULT_REQUIRED),
  },
  ['link', 'docContent']
);

export const link = number().required(errMsgs.DEFAULT_REQUIRED);

export const docContent = string()
  .min(1, errMsgs.DEFAULT_REQUIRED)
  .max(1000)
  .required(errMsgs.DEFAULT_REQUIRED);
