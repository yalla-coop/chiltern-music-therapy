const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
};

const CLIENT = {
  WELCOME: '/welcome',
  DASHBOARD: '/dashboard',
};

const THERAPIST_BASE = '/hq';

const THERAPIST = {
  HOME: THERAPIST_BASE,
  SIGNUP: `${THERAPIST_BASE}/signup`,
  WELCOME: `${THERAPIST_BASE}/welcome`,
  DASHBOARD: `${THERAPIST_BASE}/dashboard`,
};

const EXTERNAL = {
  TERMS_OF_USE: '',
};

export { GENERAL, CLIENT, THERAPIST, EXTERNAL };
