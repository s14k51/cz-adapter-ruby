module.exports = function constructFooter(answers) {
  const [, , , , , , trailerKey, trailerValue] = answers;
  if (trailerKey && trailerValue) {
    return `${trailerKey}: ${trailerValue}`;
  }
  return false;
};
