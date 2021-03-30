const allowedFileTypesAndSizes = {
  video: {
    types: ['video/mp4'],
    // 2 GB
    maxSize: '2000',
  },
  application: {
    types: ['application/pdf'],
    // 20 MB
    maxSize: '20',
  },
  audio: {
    types: ['audio/mpeg'],
    // 100 MB
    maxSize: '100',
  },
};

export default allowedFileTypesAndSizes;
