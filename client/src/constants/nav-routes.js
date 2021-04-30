const GENERAL = {
  HOME: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  ACCOUNT_DELETED_SUCCESS: '/account-deleted-success',
  HOW_TO_RECORD: '/how-to-record',
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
  SUCCESS_FEEDBACK: '/success-feedback-sent',
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
  CREATE_PROGRAMME_REVIEW: `${THERAPIST_BASE}/clients/:id/programme/create/review`,
  CREATE_PROGRAMME_SUCCESS: `${THERAPIST_BASE}/clients/:id/programme/create/success`,
  CLIENT: `${THERAPIST_BASE}/clients/:id`,
  CLIENT_HISTORY: `${THERAPIST_BASE}/clients/:id/history`,
  CONTACT_CLIENT: `${THERAPIST_BASE}/clients/:id/contact`,
  EDIT_CLIENT: `${THERAPIST_BASE}/clients/:id/edit`,
  NEW_CLIENT: `${THERAPIST_BASE}/new-client`,
  SINGLE_PROGRAMME: `${THERAPIST_BASE}/programmes/:id`,
  // EDIT PROGRAMME
  EDIT_PROGRAMME: `${THERAPIST_BASE}/programmes/:id/edit`,
  EDIT_PROGRAMME_REVIEW: `${THERAPIST_BASE}/programmes/:id/edit/review`,
  EDIT_PROGRAMME_CONTENT: `${THERAPIST_BASE}/programmes/:id/edit/content`,
  EDIT_PROGRAMME_CONTENT_SINGLE: `${THERAPIST_BASE}/programmes/:id/edit/content/:category`,
  EDIT_PROGRAMME_CONTENT_SUCCESS: `${THERAPIST_BASE}/programmes/:id/edit/success`,
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
  TERMS_OF_USE:
    'https://drive.google.com/file/d/10HNCtdLfqY8RkVvD8h0Ufxs5yR32R098/view',
  PRIVACY_POLICY:
    'https://drive.google.com/file/d/1KXb2GyC0H7NhQKFdrTQQNWjChFso0WwQ/view',
};

export { GENERAL, CLIENT, THERAPIST, ADMIN, EXTERNAL };
