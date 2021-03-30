const allowedFileTypesAndSizes = {
  video: {
    types: ['video/mp4'],
    // 2 GB
    maxSize: '2000',
  },
  application: {
    types: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    // 20 MB
    maxSize: '20',
  },
  audio: {
    types: ['audio/mpeg', 'audio/wav'],
    // 100 MB
    maxSize: '100',
  },
};

export default allowedFileTypesAndSizes;
