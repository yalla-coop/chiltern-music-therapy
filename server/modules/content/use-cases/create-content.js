import * as Content from '../model';
import * as Media from '../../media/model';

import { moveFile } from '../../../services/files-storage';

import { matchMediaTypes } from '../../../helpers';

const createContent = async ({ userId, contentData }, client) => {
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

    // move file out of temp folder and return new path for db storage
    const { copiedFile, key: newKey } = await moveFile({ bucket, key });

    if (key && copiedFile && copiedFile.CopyObjectResult) {
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

  return newContent;
};

export default createContent;
