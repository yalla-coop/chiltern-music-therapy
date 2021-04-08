import pubSub from './create-pub-sub';
import events from './event-types';
import * as ProgressUpdate from '../../modules/progress-update/model';
import * as Media from '../../modules/media/use-cases';
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
    programmeId: progressUpdate.programme.id,
    programmeCreatedAt: progressUpdate.programme.createdAt,
    to: progressUpdate.therapist.email,
  });
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
      to: progressUpdate.client.email,
    });
  },
);

pubSub.listen(events.PROGRESS_UPDATE.DELETED, async (deletedProgressUpdate) => {
  if (deletedProgressUpdate.mediaId) {
    await Media.deleteMediaById({ id: deletedProgressUpdate.mediaId });
  }
});
