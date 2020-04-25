function maxSummaryLength(options, answers) {
  const headerLength = answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0);
  return options.maxHeaderWidth - headerLength - 1;
}

function filterSubject(subject) {
  let filteredSubject = subject.trim();

  if (filteredSubject.charAt(0).toLowerCase() !== filteredSubject.charAt(0)) {
    const lowerCasedFirstLetter = filteredSubject.charAt(0).toLowerCase();
    const remainingSubject = filteredSubject.slice(1, filteredSubject.length);

    filteredSubject = `${lowerCasedFirstLetter}${remainingSubject}`;
  }

  while (filteredSubject.endsWith('.')) {
    filteredSubject = filteredSubject.slice(0, -1);
  }

  return filteredSubject;
}

module.exports = {
  maxSummaryLength,
  filterSubject,
};
