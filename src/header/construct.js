module.exports = function constructHeader(answers) {
  const [type, scope, subject, , breaking] = answers;
  const optionalScope = scope ? `(${scope})` : '';
  const optionalBreakingIndicator = breaking ? '!' : '';
  return `${type}${optionalScope}${optionalBreakingIndicator}: ${subject}`;
};
