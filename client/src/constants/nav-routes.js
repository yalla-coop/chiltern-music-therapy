const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  LOGOUT: '/logout',
};

const CLIENT = {
  WELCOME: '/welcome',
  DASHBOARD: '/dashboard',
  PROGRAMMES: '/programmes',
  THERAPIST: '/therapist',
  ACCOUNT: '/account',
};

const THERAPIST_BASE = '/therapist';

const THERAPIST = {
  HOME: THERAPIST_BASE,
  SIGNUP: `${THERAPIST_BASE}/signup`,
  WELCOME: `${THERAPIST_BASE}/welcome`,
  DASHBOARD: `${THERAPIST_BASE}/dashboard`,
  CREATE_PROGRAM: `${THERAPIST_BASE}/program/create`,
  LIBRARY: `${THERAPIST_BASE}/library`,
  FEEDBACK: `${THERAPIST_BASE}/feedback`,
  ACCOUNT: `${THERAPIST_BASE}/account`,
};

const EXTERNAL = {
  TERMS_OF_USE: '',
};

export { GENERAL, CLIENT, THERAPIST, EXTERNAL };
