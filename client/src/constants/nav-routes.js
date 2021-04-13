const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
};

const CLIENT = {
  SIGNUP: '/signup',
  WELCOME: '/welcome/:id',
  DASHBOARD: '/dashboard',
  MY_THERAPIST: '/my-therapist',
  THERAPY_PLAN: '/therapy-plan',
  THERAPY_GOALS: '/therapy-goals',
  CONTACT_THERAPIST: '/contact-therapist',
  PROGRAMMES: '/programmes',
  THERAPIST: '/my-therapist',
  ACCOUNT: '/account',
  ACCOUNT_DELETED: '/account-deleted',
  DELETE_ACCOUNT: '/delete-account',
  INDIVID_PROGRAMME: '/programmes/:id',
  SEND_UPDATE: `/programmes/:id/update`,
  SEND_FEEDBACK: `/programmes/:id/feedback`,
  SUCCESS_UPDATE: '/success-update',
};

const THERAPIST_BASE = '/therapist';

const THERAPIST = {
  HOME: THERAPIST_BASE,
  SIGNUP: `${THERAPIST_BASE}/signup`,
  WELCOME: `${THERAPIST_BASE}/welcome/:id`,
  DASHBOARD: `${THERAPIST_BASE}/dashboard`,
  LIBRARY: `${THERAPIST_BASE}/library`,
  FEEDBACK: `${THERAPIST_BASE}/feedback`,
  ACCOUNT: `${THERAPIST_BASE}/account`,
  // CREATE PROGRAM
  CREATE_PROGRAMME: `${THERAPIST_BASE}/clients/:id/programme/create`,
  CREATE_PROGRAMME_DESCRIPTION: `${THERAPIST_BASE}/clients/:id/programme/create/description`,
  CREATE_PROGRAMME_CONTENT: `${THERAPIST_BASE}/clients/:id/programme/create/content`,
  CREATE_PROGRAMME_CONTENT_SINGLE: `${THERAPIST_BASE}/clients/:id/programme/create/content/:category`,
  CREATE_PROGRAMME_CONTENT_HOW_TO_RECORD: `${THERAPIST_BASE}/clients/:id/programme/create/content/how-to-record`,
  CREATE_PROGRAMME_REVIEW: `${THERAPIST_BASE}/clients/:id/programme/create/review`,
  CREATE_PROGRAMME_SUCCESS: `${THERAPIST_BASE}/clients/:id/programme/create/success`,
  EDIT_PROGRAMME: `${THERAPIST_BASE}/clients/:id/programme/edit`,
  CLIENT: `${THERAPIST_BASE}/clients/:id`,
  CLIENT_HISTORY: `${THERAPIST_BASE}/clients/:id/history`,
  CONTACT_CLIENT: `${THERAPIST_BASE}/clients/:id/contact`,
  EDIT_CLIENT: `${THERAPIST_BASE}/clients/:id/edit`,
  NEW_CLIENT: `${THERAPIST_BASE}/new-client`,
  SINGLE_PROGRAMME: `${THERAPIST_BASE}/programmes/:id`,
  PROFILE: `${THERAPIST_BASE}/profile`,
  PROGRESS_UPDATE: `${THERAPIST_BASE}/update/:id`,
  SUCCESS_UPDATE: `${THERAPIST_BASE}/success-update`,
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
