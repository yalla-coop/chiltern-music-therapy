import { getClient } from '../../../database/connect';
import * as Content from '../model';
import * as Media from '../../media/model';

import { matchMediaTypes } from '../../programme/utils';

const createContent = async ({ userId, contentData }) => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const {
      libraryContent,
      title,
      instructions,
      link,
      docContent,
      uploadedFileInfo,
      type,
    } = contentData;

    let media;
    // create media content if present
    if (uploadedFileInfo && uploadedFileInfo.uploadedToS3) {
      const {
        name,
        key,
        bucket,
        bucketRegion,
        size,
        fileType,
      } = uploadedFileInfo;

      media = await Media.createMedia(
        {
          fileName: name,
          fileType,
          size,
          key,
          bucket,
          bucketRegion,
          createdBy: userId,
        },
        client,
      );
    }
    // create content
    const newContent = await Content.createContent(
      {
        mediaId: media && media.id,
        title,
        instructions,
        link,
        docContent,
        libraryContent,
        therapistLibraryUserId: userId,
        type: matchMediaTypes(type),
      },
      client,
    );

    await client.query('COMMIT');

    return newContent;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default createContent;
