import { getFilePreSignedUrl } from '../../../services/files-storage';

// content = { file: { key, bucket }, ...etc }

const setContentsMediaFileUrl = async (contents) => {
  const promises = [];

  contents.forEach((content) => {
    if (content.file && content.file.id) {
      const getLink = async () => {
        const url = await getFilePreSignedUrl({
          key: content.file.key,
          bucket: content.file.bucket,
        });

        // eslint-disable-next-line no-param-reassign
        content.file = {};
        // eslint-disable-next-line no-param-reassign
        content.file.url = url;
      };

      promises.push(getLink());
    }
  });

  await Promise.all(promises);
};

export default setContentsMediaFileUrl;
