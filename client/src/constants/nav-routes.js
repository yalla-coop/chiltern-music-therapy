const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  LOGOUT: '/logout',
  RESET_PASSWORD: '/reset-password',
};

const CLIENT = {
  SIGNUP: '/signup',
  WELCOME: '/welcome',
  DASHBOARD: '/dashboard',
  MY_THERAPIST: '/my-therapist',
  THERAPY_PLAN: '/therapy-plan',
  THERAPY_GOALS: '/therapy-goals',
  CONTACT_THERAPIST: '/contact-therapist',
  PROGRAMMES: '/programmes',
  THERAPIST: '/my-therapist',
  PROGRAMME: '/programmes/:id',
  ACCOUNT: '/account',
  SINGLE_PROGRAMME: '/programmes/:id',
};

const THERAPIST_BASE = '/therapist';

const THERAPIST = {
  HOME: THERAPIST_BASE,
  SIGNUP: `${THERAPIST_BASE}/signup`,
  WELCOME: `${THERAPIST_BASE}/welcome`,
  DASHBOARD: `${THERAPIST_BASE}/dashboard`,
  LIBRARY: `${THERAPIST_BASE}/library`,
  FEEDBACK: `${THERAPIST_BASE}/feedback`,
  ACCOUNT: `${THERAPIST_BASE}/account`,
  // CREATE PROGRAM
  CREATE_PROGRAM: `${THERAPIST_BASE}/program/create`,
  CREATE_PROGRAM_DESCRIPTION: `${THERAPIST_BASE}/program/create/description`,
  CREATE_PROGRAM_CONTENT: `${THERAPIST_BASE}/program/create/content`,
  CREATE_PROGRAM_CONTENT_SINGLE: `${THERAPIST_BASE}/program/create/content/:category`,
  CREATE_PROGRAM_REVIEW: `${THERAPIST_BASE}/program/create/review`,
  CREATE_PROGRAM_SUCCESS: `${THERAPIST_BASE}/program/create/success`,
  CLIENT: `${THERAPIST_BASE}/clients/:id`,
  NEW_CLIENT: `${THERAPIST_BASE}/new-client`,
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
