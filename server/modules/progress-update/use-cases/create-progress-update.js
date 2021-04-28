import * as ProgressUpdate from '../model';
import * as Media from '../../media/model';

import { getClient } from '../../../database/connect';
import events from '../../../services/events';
import { matchMediaTypes } from '../../../helpers';
import { moveFile } from '../../../services/files-storage';

const createProgressUpdate = async ({
  uploadedFileInfo = {},
  clientMessage,
  link,
  programmeId,
  type,
  userId,
}) => {
  const client = await getClient();

  const { name, key, bucket, bucketRegion, size, fileType } = uploadedFileInfo;
  let media;

  try {
    await client.query('BEGIN');

    if (key && name) {
      // move file out of temp folder and return new path for db storage
      const { copiedFile, key: newKey } = await moveFile({ bucket, key });

      if (newKey && copiedFile && copiedFile.CopyObjectResult) {
        media = await Media.createMedia(
          {
            fileName: name,
            fileType,
            size,
            key: newKey,
            bucket,
            bucketRegion,
            createdBy: userId,
          },
          client,
        );
      }
    }

    const progressUpdate = await ProgressUpdate.createProgressUpdate(
      {
        clientMessage,
        mediaId: media && media.id,
        link: media && media.id ? null : link,
        programmeId,
        type: matchMediaTypes(type),
      },
      client,
    );

    await client.query('COMMIT');

    events.emit(events.types.PROGRESS_UPDATE.CREATED, {
      progressId: progressUpdate.id,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export default createProgressUpdate;
