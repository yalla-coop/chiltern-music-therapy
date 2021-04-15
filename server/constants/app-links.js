import config from '../config';

const { appUrl } = config.emails;

const therapist = 'therapist';

const appLinks = {
  // GENERAL
  LOGIN: `${appUrl}/login`,
  RESET_PASSWORD: `${appUrl}/reset-password/:token`,
  // CLIENT
  CLIENT_SIGNUP_INVITE: `${appUrl}/signup/?invite=:invite`,
  // THERAPIST
  THERAPIST_SINGLE_PROGRAMME: `${appUrl}/${therapist}/programme/:id`,
};

export { appLinks };
