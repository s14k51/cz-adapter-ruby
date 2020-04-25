function filter(array) {
  return array.filter((x) => x);
}

function headerLength(answers) {
  return answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0);
}

function maxSummaryLength(options, answers) {
  return options.maxHeaderWidth - headerLength(answers) - 1;
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
  filter,
  maxSummaryLength,
  filterSubject,
};
