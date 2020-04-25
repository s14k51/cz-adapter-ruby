const wrap = require('word-wrap');

const { filter } = require('./utils');

function constructHeader(answers) {
  // parentheses are only needed when a scope is present
  const scope = answers.scope ? `(${answers.scope})` : '';
  const breakingIndicator = answers.doIndicateBreaking ? '!' : '';

  // Hard limit this line in the validate
  return `${answers.type}${scope}${breakingIndicator}: ${answers.subject}`;
}

function constructBody(answers, wrapOptions) {
  // Wrap these lines at options.maxLineWidth characters
  return answers.body ? wrap(answers.body, wrapOptions) : false;
}

function constructBreaking(answers, wrapOptions) {
  // Apply breaking change prefix, removing it if already present
  let breaking = answers.breaking ? answers.breaking.trim() : '';
  breaking = breaking ? `BREAKING CHANGE: ${breaking.replace(/^BREAKING CHANGE: /, '')}` : '';
  return breaking ? wrap(breaking, wrapOptions) : false;
}

function constructIssues(answers, wrapOptions) {
  return answers.issues ? wrap(answers.issues, wrapOptions) : false;
}

module.exports = function constructCommitMessage(answers, options) {
  const wrapOptions = {
    trim: true,
    cut: false,
    newline: '\n',
    indent: '',
    width: options.maxLineWidth,
  };

  const header = constructHeader(answers);
  const body = constructBody(answers, wrapOptions);
  const breaking = constructBreaking(answers, wrapOptions);
  const issues = constructIssues(answers, wrapOptions);

  return filter([header, body, breaking, issues]).join('\n\n');
};
