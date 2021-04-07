const events = {
  // USER
  USER: {
    CLIENT_SIGNUP: 'USER.CLIENT.SIGNUP',
    CLIENT_THERAPIST: 'USER.THERAPIST.SIGNUP',
    DELETED: 'USER.DELETED',
  },
  PROGRAMME: {
    CREATED: 'PROGRAMME.CREATED',
    DELETED: 'PROGRAMME.DELETED',
    UPDATED: 'PROGRAMME.UPDATED',
    FEEDBACK: {
      CREATED: 'PROGRAMME.FEEDBACK.CREATED',
    },
  },
  PROGRESS_UPDATE: {
    CREATED: 'PROGRESS_UPDATE.CREATED',
    THERAPIST_RESPOND: 'PROGRESS_UPDATE.THERAPIST_RESPOND',
  },
  THERAPIST_CLIENT: {
    CLIENT_INVITED: 'CLIENT.INVITED',
  },
};

export default events;
