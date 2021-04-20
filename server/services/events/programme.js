import pubSub from './create-pub-sub';
import events from './event-types';
import * as Programme from '../../modules/programme/model';
import * as Content from '../../modules/content/model';
import { sendMail, keys } from '../emails';

pubSub.listen(events.PROGRAMME.CREATED, async ({ programmeId }) => {
  const programme = await Programme.findProgrammeWithUsersById(programmeId);

  const firstInitial = programme.client.firstName[0];
  const therapistName = `${programme.therapist.firstName} ${programme.therapist.lastName}`;

  await sendMail(keys.CLIENT_THERAPIST_CREATED_PROGRAMME, {
    firstInitial,
    therapistName,
    programmeId: programme.id,
    to: programme.client.email,
  });

  await Content.deleteUnusedContentCategories();
});

pubSub.listen(events.PROGRAMME.UPDATED, async ({ programmeId }) => {
  const programme = await Programme.findProgrammeWithUsersById(programmeId);

  const firstInitial = programme.client.firstName[0];
  const therapistName = `${programme.therapist.firstName} ${programme.therapist.lastName}`;

  await sendMail(keys.CLIENT_THERAPIST_UPDATED_PROGRAMME, {
    firstInitial,
    therapistName,
    programmeId: programme.id,
    programmeCreatedAt: programme.createdAt,
    to: programme.client.email,
  });

  await Content.deleteUnusedContentCategories();
});

pubSub.listen(events.PROGRAMME.FEEDBACK.CREATED, async ({ feedbackId }) => {
  const feedback = await Programme.findProgrammeFeedbackWithUsersById(
    feedbackId,
  );

  const firstInitial = feedback.client.firstName[0];
  const therapistName = `${feedback.therapist.firstName} ${feedback.therapist.lastName}`;

  await sendMail(keys.THERAPIST_CLIENT_SENT_PROGRAMME_FEEDBACK, {
    firstInitial,
    therapistName,
    programmeCreatedAt: feedback.programme.createdAt,
    programmeId: feedback.programme.id,
    to: feedback.client.email,
  });
});
