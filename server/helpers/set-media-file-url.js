import { getFilePreSignedUrl } from '../services/files-storage';

// input arrayRef = [{ file: { key, bucket }, ...etc }]
// output arrayRef = [{ file: { url }, ...etc }]

const setMediaFileUrl = async (arrayRef, field = 'file') => {
  const promises = [];

  arrayRef.forEach((item) => {
    if (item[field] && item[field].id) {
      const getLink = async () => {
        const url = await getFilePreSignedUrl({
          key: item[field].key,
          bucket: item[field].bucket,
        });

        // eslint-disable-next-line no-param-reassign
        item[field] = {};
        // eslint-disable-next-line no-param-reassign
        item[field].url = url;
      };

      promises.push(getLink());
    }
  });

  await Promise.all(promises);
};

export default setMediaFileUrl;
