const matchMediaTypes = (type) => {
  switch (type) {
    case 'document':
      return 'DOCUMENT';
    case 'video':
      return 'VIDEO';
    case 'audio':
      return 'AUDIO';
    case 'image':
      return 'IMAGE';

    default:
      return `invalid media type: ${type}`;
  }
};

export default matchMediaTypes;
