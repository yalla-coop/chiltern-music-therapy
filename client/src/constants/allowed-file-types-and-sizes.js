const fileCategories = {
  video: 'video',
  application: 'application',
  audio: 'audio',
};

const fileTypes = {
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
      return `${fileTypes.videoMp4}`;
    case fileCategories.application:
      return `${fileTypes.applicationPdf}, ${fileTypes.applicationDoc}, ${fileTypes.applicationDocX} `;
    case fileCategories.audio:
      return `${fileTypes.audioMpeg}, ${fileTypes.audioWav}`;

    default:
      throw new Error(`Unhandled type: ${category}`);
  }
};

const fileTypeValidation = { printFileTypes, allowedFileTypesAndSizes };

export default fileTypeValidation;
