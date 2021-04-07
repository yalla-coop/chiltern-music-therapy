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
  CREATE_PROGRAM: `${THERAPIST_BASE}/program/create`,
  LIBRARY: `${THERAPIST_BASE}/library`,
  FEEDBACK: `${THERAPIST_BASE}/feedback`,
  ACCOUNT: `${THERAPIST_BASE}/account`,
  CLIENT: `${THERAPIST_BASE}/clients/:id`,
  CLIENT_HISTORY: `${THERAPIST_BASE}/clients/:id/history`,
  CONTACT_CLIENT: `${THERAPIST_BASE}/clients/:id/contact`,
  EDIT_CLIENT: `${THERAPIST_BASE}/clients/:id/edit`,
  NEW_CLIENT: `${THERAPIST_BASE}/new-client`,
  SINGLE_PROGRAMME: `${THERAPIST_BASE}/programmes/:id`,
  PROFILE: `${THERAPIST_BASE}/profile`,
};

const ADMIN_BASE = '/admin';

const ADMIN = {
  ALL_FEEDBACK: `${ADMIN_BASE}/all-feedback`,
  ALL_CONTENT: `${ADMIN_BASE}/all-content`,
};

const EXTERNAL = {
  TERMS_OF_USE: 'https://www.google.com/',
  PRIVACY_POLICY:
    'https://docs.google.com/document/d/1KXb2GyC0H7NhQKFdrTQQNWjChFso0WwQ',
};

export { GENERAL, CLIENT, THERAPIST, ADMIN, EXTERNAL };
