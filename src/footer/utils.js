function filterTrailerValue(trailerValue) {
  let filteredTrailerValue = trailerValue.trim();

  while (filteredTrailerValue.endsWith('.')) {
    filteredTrailerValue = filteredTrailerValue.slice(0, -1);
  }

  return filteredTrailerValue;
}

module.exports = {
  filterTrailerValue,
};
