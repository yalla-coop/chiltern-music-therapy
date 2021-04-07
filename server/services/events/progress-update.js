import pubSub from './create-pub-sub';
import events from './event-types';
import * as ProgressUpdate from '../../modules/progress-update/model';
import { sendMail, keys } from '../emails';

pubSub.listen(events.PROGRESS_UPDATE.CREATED, async ({ progressId }) => {
  const progressUpdate = await ProgressUpdate.findProgressUpdateWithUsersById(
    progressId,
  );

  const firstInitial = progressUpdate.client.firstName[0];
  const therapistName = `${progressUpdate.therapist.firstName} ${progressUpdate.therapist.lastName}`;

  await sendMail(keys.THERAPIST_CLIENT_SENT_PROGRESS_UPDATE, {
    firstInitial,
    therapistName,
  });
  // more subscribers go here
});

pubSub.listen(
  events.PROGRESS_UPDATE.THERAPIST_RESPOND,
  async ({ progressId }) => {
    const progressUpdate = await ProgressUpdate.findProgressUpdateWithUsersById(
      progressId,
    );

    const firstInitial = progressUpdate.client.firstName[0];
    const therapistName = `${progressUpdate.therapist.firstName} ${progressUpdate.therapist.lastName}`;

    await sendMail(keys.CLIENT_THERAPIST_RESPOND_TO_PROGRESS_UPDATE, {
      firstInitial,
      therapistName,
    });
    // more subscribers go here
  },
);
