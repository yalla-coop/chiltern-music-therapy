import { getFilePreSignedUrl } from '../services/files-storage';

// input arrayRef = [{ file: { key, bucket }, ...etc }]
// output arrayRef = [{ file: { url }, ...etc }]

const setMediaFileUrl = async (arrayRef) => {
  const promises = [];

  arrayRef.forEach((item) => {
    if (item.file && item.file.id) {
      const getLink = async () => {
        const url = await getFilePreSignedUrl({
          key: item.file.key,
          bucket: item.file.bucket,
        });

        // eslint-disable-next-line no-param-reassign
        item.file = {};
        // eslint-disable-next-line no-param-reassign
        item.file.url = url;
      };

      promises.push(getLink());
    }
  });

  await Promise.all(promises);
};

export default setMediaFileUrl;
