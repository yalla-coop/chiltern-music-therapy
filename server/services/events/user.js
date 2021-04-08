import pubSub from './create-pub-sub';
import events from './event-types';
import * as ProgressUpdate from '../../modules/progress-update/use-cases';

pubSub.listen(events.USER.CLIENT_DELETED, async ({ userId }) => {
  // send email to therapist
  await ProgressUpdate.deleteProgressUpdateById({ id: userId });
});
