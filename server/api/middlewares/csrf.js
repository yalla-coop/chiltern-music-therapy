import csrf from 'csurf';
import { CSRF_TOKEN, XSRF_TOKEN } from '../../constants';

import config from '../../config';

const { env } = config.common;

const csrfProtection = csrf({
  cookie: { key: CSRF_TOKEN, httpOnly: true, secure: env === 'production' },
});

const createCSRFToken = (req, res, next) => {
  const token = req.csrfToken();
  res.cookie(XSRF_TOKEN, token);
  req.csrf = token;
  next();
};

export { createCSRFToken };
export default csrfProtection;
