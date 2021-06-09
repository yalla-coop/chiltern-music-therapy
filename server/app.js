import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import logger from 'morgan';
import Debug from 'debug';
import Boom from '@hapi/boom';
import { Sqreen } from './services';

import './services/events/listeners';

import { Sentry } from './services/error-handler';

import router from './api';
import config from './config';
import * as constants from './constants';
import { requireHTTPS, helmet } from './api/middlewares';

const { PRODUCTION, TEST } = constants.envTypes;

// eslint-disable-next-line no-unused-vars
const debug = Debug('server');

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(Sqreen.middleware);
app.use(logger('dev'));

if (config.common.env === PRODUCTION) {
  app.use(helmet);
  app.use(requireHTTPS);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

if (config.common.env === PRODUCTION) {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.use(
    favicon(path.join(__dirname, '..', 'client', 'build', 'favicon.ico')),
  );

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // ignore non server errors
      if (error.output && error.output.statusCode < 500) {
        return false;
      }
      return true;
    },
  }),
);

// eslint-disable-next-line no-unused-vars
app.use((err, _, res, next) => {
  let error = err;
  if (!Boom.isBoom(err)) {
    error = Boom.badImplementation(err.message);
  }
  const { statusCode, payload } = error.output;

  if (config.common.env !== TEST) {
    console.log(err);
  }

  return res.status(statusCode).json({
    data: { ...error.data },
    ...payload,
  });
});
export default app;
