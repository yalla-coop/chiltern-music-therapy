import * as Programme from '../model';
import * as TherapistClients from '../../therapist-client/use-cases';
import { userRoles } from '../../../constants';

const getProgrammes = async ({ userId, role, clientUserId }) => {
  let programmes;
  switch (role) {
    case userRoles.CLIENT:
      programmes = await Programme.findProgrammesByClient(userId);
      break;

    case userRoles.THERAPIST:
      await TherapistClients.authorizeClientToTherapist({
        clientId: clientUserId,
        therapistId: userId,
      });

      programmes = await Programme.findProgrammesByClient(clientUserId);
      break;

    default:
      break;
  }

  return programmes;
};

export default getProgrammes;
