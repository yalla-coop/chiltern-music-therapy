import jwt from 'jsonwebtoken';
import config from '../config';

const oneDayInMs = 24 * 60 * 60 * 10000;
const { tokenMaxAge, secret, tokenName } = config.server;
const createTestToken = (id, isSession) => {
  const expiresIn = isSession ? `${oneDayInMs}ms` : `${tokenMaxAge}ms`;
  const token = jwt.sign({ id, isVerified: !isSession }, secret, {
    expiresIn,
  });

  return `${tokenName}=${token}`;
};

export default createTestToken;
