const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
};

const CLIENT = {
  WELCOME: '/welcome',
  DASHBOARD: '/dashboard',
};

const THERAPIST_BASE = '/therapist';

const THERAPIST = {
  HOME: THERAPIST_BASE,
  SIGNUP: `${THERAPIST_BASE}/signup`,
  WELCOME: `${THERAPIST_BASE}/welcome`,
  DASHBOARD: `${THERAPIST_BASE}/dashboard`,
  CREATE_PROGRAM: `${THERAPIST_BASE}/program/create`,
};

const EXTERNAL = {
  TERMS_OF_USE: '',
};

export { GENERAL, CLIENT, THERAPIST, EXTERNAL };
