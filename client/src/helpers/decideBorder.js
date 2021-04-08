const decideBorder = (type) => {
  switch (type) {
    case 'VIDEO':
      return 'rainbowHorizontal';
    case 'DOCUMENT':
      return 'darkBlueH';
    case 'AUDIO':
      return 'PinkUnderH';
    default:
      return 'darkBlueH';
  }
};

export default decideBorder;
