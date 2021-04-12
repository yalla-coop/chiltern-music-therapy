import * as Media from '../model';
import events from '../../../services/events';

const updateMediaById = async ({
  id,
  fileName,
  fileType,
  size,
  key,
  bucket,
  bucketRegion,
  createdBy,
}) => {
  const mediaToUpdate = await Media.findMediaById(id);

  let updatedMedia;

  if (!mediaToUpdate) {
    updatedMedia = await Media.createMedia({
      fileName,
      fileType,
      size,
      key,
      bucket,
      bucketRegion,
      createdBy,
    });
  } else {
    updatedMedia = await Media.updateMediaById({
      id,
      fileName,
      fileType,
      size,
      key,
      bucket,
      bucketRegion,
      createdBy,
    });

    events.emit(events.types.MEDIA.DELETED, mediaToUpdate);
  }

  return updatedMedia;
};

export default updateMediaById;
