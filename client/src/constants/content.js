const fileCategories = {
  video: 'video',
  document: 'document',
  audio: 'audio',
};

const fileTypesShort = {
  videoMp4: '.mp4',
  applicationPdf: '.pdf',
  applicationDoc: '.doc',
  applicationDocX: '.docx',
  audioMpeg: '.mpeg',
  audioWav: '.wav',
};

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

const printFileTypes = (category) => {
  switch (category) {
    case fileCategories.video:
      return `${fileTypesShort.videoMp4}`;
    case fileCategories.application:
      return `${fileTypesShort.applicationPdf}, ${fileTypesShort.applicationDoc}, ${fileTypesShort.applicationDocX} `;
    case fileCategories.audio:
      return `${fileTypesShort.audioMpeg}, ${fileTypesShort.audioWav}`;

    default:
      throw new Error(`Unhandled type: ${category}`);
  }
};

export { fileCategories, printFileTypes, allowedFileTypesAndSizes };
