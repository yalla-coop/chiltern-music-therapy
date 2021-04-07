import pubSub from './create-pub-sub';
import events from './event-types';
import * as TherapistClient from '../../modules/therapist-client/model';
import { sendMail, keys } from '../emails';

pubSub.listen(
  events.THERAPIST_CLIENT.CLIENT_INVITED,
  async ({ therapistClientId }) => {
    const therapistClient = await TherapistClient.findTherapistClientWithUsersById(
      therapistClientId,
    );

    const firstInitial = therapistClient.client.firstName[0];
    const therapistName = `${therapistClient.therapist.firstName} ${therapistClient.therapist.lastName}`;
    const { inviteToken } = therapistClient;

    await sendMail(keys.CLIENT_SIGNUP_INVITE, {
      firstInitial,
      therapistName,
      inviteToken,
    });
  },
);
