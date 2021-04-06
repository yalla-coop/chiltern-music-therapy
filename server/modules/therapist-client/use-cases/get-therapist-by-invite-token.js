import Boom from '@hapi/boom';
import * as TherapistClients from '../model';
import { errorMsgs } from '../../../services/error-handler';

const getTherapistByInviteToken = async ({ inviteToken }) => {
  const therapist = await TherapistClients.findTherapistByInviteToken(
    inviteToken,
  );

  if (!therapist) {
    throw Boom.notFound(errorMsgs.INVALID_TOKEN);
  }

  return therapist;
};

export default getTherapistByInviteToken;
