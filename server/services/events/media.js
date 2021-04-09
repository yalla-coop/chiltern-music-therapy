import pubSub from './create-pub-sub';
import events from './event-types';
import { deleteFile } from '../files-storage';
import * as Content from '../../modules/content/model';
import * as Media from '../../modules/media/use-cases';

pubSub.listen(events.MEDIA.DELETED, async (deletedMedia) => {
  const { key, bucket } = deletedMedia;
  await deleteFile({ key, bucket });
});

pubSub.listen(events.MEDIA.CONTENT_DELETED, async ({ mediaId, contentId }) => {
  const contents = await Content.findContentByMediaId(mediaId);
  const remainingContents = contents.filter(
    (content) => content.id !== contentId,
  );

  if (remainingContents.length === 0) {
    await Media.deleteMediaById({ id: mediaId });
  }
});
