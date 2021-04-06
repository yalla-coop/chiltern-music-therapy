// MAKE SURE THIS FILE IS SYNCED WIth /home/ramy/scouts/server/database/init/types.sql
// NOTE!!! IF YOU CHANGE ANY TYPES HERE MAKE SURE YOU UPDATE THE SRC CONSTANTS FILE AS WELL

export const userRoles = {
  CLIENT: 'CLIENT',
  THERAPIST: 'THERAPIST',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const userStatuses = {
  INVITED: 'INVITED',
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
};
export const mediaTypes = {
  PROFILE_IMAGE: 'PROFILE_IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
  IMAGE: 'IMAGE',
};
export const programmeStatuses = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  DELETED: 'DELETED',
};
