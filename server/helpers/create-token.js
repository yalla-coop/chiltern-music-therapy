import jwt from 'jsonwebtoken';
import config from '../config';
import { TOKEN_NAME } from '../constants';

const { tokenMaxAge, secret } = config.server;
const { env } = config.common;

const createToken = (data) => {
  const maxAge = tokenMaxAge;
  const expiresIn = `${tokenMaxAge}ms`;
  const token = jwt.sign(data, secret, {
    expiresIn,
  });

  const expressOptions = {
    maxAge,
    httpOnly: true,
    secure: env === 'production',
    // set the secure flag only in production
    // warning, cookies on production will only work over https and not http
  };
  return { token, tokenName: TOKEN_NAME, options: expressOptions };
};

export default createToken;
