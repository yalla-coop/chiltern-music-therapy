import * as Sentry from '@sentry/node';
// eslint-disable-next-line no-unused-vars
import * as Tracing from '@sentry/tracing';

import config from '../../config';
import * as constants from '../../constants';

const { PRODUCTION } = constants.envTypes;

if (config.common.env === PRODUCTION) {
  Sentry.init({
    dsn: config.common.sentryDNS,
    beforeSend(event, hint) {
      const exception = hint.originalException;

      if (exception && exception.message) {
        // eslint-disable-next-line no-param-reassign
        event.fingerprint = ['{{ default }}', String(exception.message)];
      }
      return event;
    },
  });
}

export default Sentry;
