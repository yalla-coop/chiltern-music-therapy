import config from '../../config';
import { envTypes } from '../../constants';

let sqreen = {};

const { env } = config.common;

if (env !== envTypes.PRODUCTION) {
  sqreen.middleware = (req, res, next) => {
    req.sqreen = {};
    req.sqreen.auth_track = () => {};
    req.sqreen.signup_track = () => {};
    req.sqreen.identify = () => {};
    next();
  };
} else {
  // eslint-disable-next-line global-require
  sqreen = require('sqreen');
}

const Sqreen = sqreen;
export default Sqreen;
