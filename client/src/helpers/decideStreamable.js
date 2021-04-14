const decideStreamable = (type, path) => {
  if (['VIDEO', 'AUDIO'].includes(type) && path) {
    return true;
  }
  return false;
};

export default decideStreamable;
