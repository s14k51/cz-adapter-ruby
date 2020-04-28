const { supportedKeys } = require('./data');

module.exports = function constructFooter(answers) {
  const [, , , , , trailers] = answers;

  if (trailers.length > 0) {
    const groupMap = trailers.reduce((trailerMap, trailer) => {
      const { key, value } = trailer;
      const footerLine = `${key}: ${value}`;
      const keyBucket = trailerMap[key];
      return { ...trailerMap, [key]: !keyBucket ? [footerLine] : [...keyBucket, footerLine] };
    }, {});
    return supportedKeys
      .reduce((footerLines, key) => {
        const bucket = groupMap[key];
        if (bucket) {
          return [...footerLines, ...bucket];
        }
        return footerLines;
      }, [])
      .join('\n');
  }

  return false;
};
