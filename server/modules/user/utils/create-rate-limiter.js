import { RateLimiterPostgres } from 'rate-limiter-flexible';
import { pool } from '../../../database';

const rateLimiter = async (_opts) => {
  const opts = {
    storeClient: pool,
    ..._opts,
  };

  return new Promise((resolve, reject) => {
    let _rateLimiter;
    const ready = (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(_rateLimiter);
      }
    };

    _rateLimiter = new RateLimiterPostgres(opts, ready);
  });
};

export default rateLimiter;
