module.exports = function constructHeader(answers) {
  const [type, scope, subject, , , doIndicateBreaking] = answers;
  const optionalScope = scope ? `(${scope})` : '';
  const optionalBreakingIndicator = doIndicateBreaking ? '!' : '';
  return `${type}${optionalScope}${optionalBreakingIndicator}: ${subject}`;
};
