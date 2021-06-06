import csrf from 'csurf';
import { CSRF_TOKEN, XSRF_TOKEN, envTypes } from '../../constants';

import config from '../../config';

const { env } = config.common;

const csrfProtectionMock = (req, res, next) => {
  return next();
};

const csrfProtectionEnabled = csrf({
  cookie: {
    key: CSRF_TOKEN,
    httpOnly: true,
    secure: env === 'production',
  },
});

const csrfProtection =
  env === envTypes.TEST ? csrfProtectionMock : csrfProtectionEnabled;

const createCSRFToken = (req, res, next) => {
  if (env === envTypes.TEST) {
    return next();
  }

  const token = req.csrfToken();
  res.cookie(XSRF_TOKEN, token);
  req.csrf = token;
  next();
};

export { createCSRFToken };
export default csrfProtection;
