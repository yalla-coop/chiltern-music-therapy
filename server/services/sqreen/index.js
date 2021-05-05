import config from '../../config';
import { envTypes } from '../../constants';

let Sqreen = {};

const { env } = config.common;

if (env !== envTypes.PRODUCTION) {
  Sqreen.middleware = (req, res, next) => {
    req.sqreen = {};
    req.sqreen.auth_track = () => {};
    req.sqreen.signup_track = () => {};
    req.sqreen.identify = () => {};
    next();
  };
} else {
  // eslint-disable-next-line global-require
  Sqreen = require('sqreen');
}

module.exports = Sqreen;
