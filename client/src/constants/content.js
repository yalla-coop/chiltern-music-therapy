const welcomeScreens = {
  THERAPIST: [
    {
      title: {
        boldSection: 'Welcome',
        lightSection: 'to Chiltern Music Therapy',
        boldFirst: true,
      },
      text: `Thank you for signing up. You can now  share content and home programmes with your clients to help them work on their therapy goals`,
      image: 'headphones',
      btn: 'Next',
    },
    {
      title: { boldSection: 'content', lightSection: 'Sharing' },
      text: `You can share all sorts of content in one place, organise your clients and even save content to use more than once`,
      image: 'man',
      btn: 'Next',
    },
    {
      title: {
        boldSection: 'notify',
        lightSection: 'Easily',
        lightSection2: 'my clients',
      },
      text: `Instantly notify your clients whenever their programmes are ready and get feedback and updates from them all in one place`,
      image: 'momPink',
      btn: `Let's start`,
    },
  ],
  CLIENT: [
    {
      title: {
        boldSection: 'Welcome',
        lightSection: 'to Chiltern Music Therapy',
        boldFirst: true,
      },
      text: `This is a space to support your in-person music therapy work, and for you and your therapist to share therapeutic resources to be accessed at your own time in between sessions. This platform is aimed to enhance your access to music therapy plan in a flexible and consistent way. Enjoy!`,
      image: 'headphones',
      btn: 'Next',
    },
    {
      title: { boldSection: 'feedback', lightSection: 'Giving' },
      text: `You will have the chance to provide feedback on the content received at the end of each week and help us tailor it to your needs and preferences.`,
      image: 'hands',
      btn: 'Next',
    },
    {
      title: { boldSection: 'update', lightSection: 'Share a weekly' },
      text: `You can also share a weekly update in between each session to let your therapist see how you’re doing.`,
      image: 'meeting',
      btn: 'Next',
    },
    {
      title: {
        boldSection: 'updates',
        lightSection: 'Get email',
        lightSection2: 'from your therapist',
      },
      text: `Make sure to check your spam and mark emails from Chiltern Music Therapy as not spam so you don’t miss these!`,
      image: 'mom',
      btn: 'Next',
    },
    {
      title: {
        boldSection: 'safe',
        lightSection: 'Your information is',
        lightSection2: 'with us',
      },
      text: `Your privacy is incredibly important (and that all videos are password protected?)`,
      image: 'man',
      btn: 'Next',
    },
  ],
};

const fileCategories = {
  video: 'video',
  document: 'document',
  audio: 'audio',
  image: 'image',
};

const fileTypesShort = {
  videoMp4: '.mp4',
  videoQuicktime: '.mov',
  applicationPdf: '.pdf',
  applicationDoc: '.doc',
  applicationDocX: '.docx',
  audioMpeg: '.mpeg',
  audioWav: '.wav',
  imageJpg: '.jpg',
  imageJpeg: '.jpeg',
  imagePng: '.png',
};

const allowedFileTypesAndSizes = {
  video: {
    types: ['video/mp4', 'video/quicktime'],
    // 2 GB
    maxSize: '2000',
  },
  document: {
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
  image: {
    types: ['image/png', 'image/jpg', 'image/jpeg'],
    maxSize: '30',
  },
};

const printFileTypes = (category) => {
  switch (category) {
    case fileCategories.video:
      return `${fileTypesShort.videoMp4}, ${fileTypesShort.videoQuicktime}`;
    case fileCategories.document:
      return `${fileTypesShort.applicationPdf}, ${fileTypesShort.applicationDoc}, ${fileTypesShort.applicationDocX} `;
    case fileCategories.audio:
      return `${fileTypesShort.audioMpeg}, ${fileTypesShort.audioWav}`;
    case fileCategories.image:
      return `${fileTypesShort.imageJpeg}, ${fileTypesShort.imageJpg}, ${fileTypesShort.imagePng}`;
    default:
      throw new Error(`Unhandled type: ${category}`);
  }
};

export {
  fileCategories,
  printFileTypes,
  allowedFileTypesAndSizes,
  welcomeScreens,
};
