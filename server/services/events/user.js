import pubSub from './create-pub-sub';
import events from './event-types';
import * as ProgressUpdate from '../../modules/progress-update/use-cases';
import * as TherapistClient from '../../modules/therapist-client/model';
import { sendMail, keys } from '../emails';

pubSub.listen(events.USER.CLIENT_DELETED, async (deletedClient) => {
  await ProgressUpdate.deleteProgressUpdateById({ id: deletedClient.id });

  const _therapistClient = await TherapistClient.findTherapistClientByClientId(
    deletedClient.id,
  );
  const therapistClient = await TherapistClient.findTherapistClientWithUsersById(
    _therapistClient.id,
  );

  const firstInitial = deletedClient.firstName[0];
  const therapistName = `${therapistClient.therapist.firstName} ${therapistClient.therapist.lastName}`;

  await sendMail(keys.CLIENT_ACCOUNT_DELETED, {
    to: deletedClient.email,
    firstInitial,
  });

  await sendMail(keys.THERAPIST_CLIENT_ACCOUNT_DELETED, {
    to: therapistClient.therapist.email,
    therapistName,
  });
});

pubSub.listen(
  events.USER.RESET_PASSWORD,
  async ({ resetToken, firstInitial, email }) => {
    await sendMail(keys.USER_RESET_PASSWORD, {
      to: email,
      firstInitial,
      resetToken,
    });
  },
);
