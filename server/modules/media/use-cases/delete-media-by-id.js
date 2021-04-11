import Boom from '@hapi/boom';
import * as Media from '../model';
import { errorMsgs } from '../../../services/error-handler';
import events from '../../../services/events';

const deleteMediaById = async ({ id }) => {
  const deletedMedia = await Media.deleteMediaById(id);

  if (!deletedMedia) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  events.emit(events.types.MEDIA.DELETED, deletedMedia);

  return deletedMedia;
};

export default deleteMediaById;
