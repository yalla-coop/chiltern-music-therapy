const linkFormatter = (url) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
};

export default linkFormatter;
