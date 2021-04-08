import pubSub from './create-pub-sub';
import events from './event-types';
import { deleteFile } from '../files-storage';

pubSub.listen(events.MEDIA.DELETED, async (deletedMedia) => {
  const { key, bucket } = deletedMedia;
  await deleteFile({ key, bucket });
});
