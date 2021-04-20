import pubSub from './create-pub-sub';
import events from './event-types';
import * as Content from '../../modules/content/model';

// eslint-disable-next-line no-unused-vars
pubSub.listen(events.CONTENT.UPDATED, async ({ contentId }) => {
  await Content.deleteUnusedContentCategories();
});
