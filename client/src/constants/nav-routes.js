const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  LOGOUT: '/logout',
  RESET_PASSWORD: '/reset-password',
};

const CLIENT = {
  WELCOME: '/welcome',
  DASHBOARD: '/dashboard',
  PROGRAMMES: '/programmes',
  THERAPIST: '/therapist',
  ACCOUNT: '/account',
  SINGLE_PROGRAMME: '/programmes/:id',
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

const ADMIN_BASE = '/admin';

const ADMIN = {
  ALL_FEEDBACK: `${ADMIN_BASE}/all-feedback`,
  ALL_CONTENT: `${ADMIN_BASE}/all-content`,
};

const EXTERNAL = {
  TERMS_OF_USE: 'https://www.google.com/',
  PRIVACY_POLICY: 'https://www.google.com/',
};

export { GENERAL, CLIENT, THERAPIST, ADMIN, EXTERNAL };
