/* eslint-disable no-useless-escape */
const sanitize = (string, isTest, isPassword) => {
  const rgx = /([-!#$%^&*=+/(){}\][:\'\"\`<>?\,])/g;
  const rgx2 = /([/(){}\][:\'\"\`<>?\,])/g;
  if (typeof string !== 'string') return;
  if (isTest) {
    const result = string.match(rgx);
    return result && result.length > 0 ? true : null;
  }

  if (isPassword) {
    return string.replace(rgx2, '');
  }
  return string.replace(rgx, '');
};

export default sanitize;
