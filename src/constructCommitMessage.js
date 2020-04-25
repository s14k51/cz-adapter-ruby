const wrap = require('word-wrap');

const { filter } = require('./utils');

function constructHeader(answers) {
  // parentheses are only needed when a scope is present
  const scope = answers.scope ? `(${answers.scope})` : '';

  // Hard limit this line in the validate
  return `${answers.type}${scope}: ${answers.subject}`;
}

function constructBody(answers, wrapOptions) {
  // Wrap these lines at options.maxLineWidth characters
  const body = answers.body || answers.breakingBody || answers.issuesBody;
  return body ? wrap(body, wrapOptions) : false;
}

function constructBreaking(answers, wrapOptions) {
  // Apply breaking change prefix, removing it if already present
  let breaking = answers.breaking ? answers.breaking.trim() : '';
  breaking = breaking ? `BREAKING CHANGE: ${breaking.replace(/^BREAKING CHANGE: /, '')}` : '';
  return breaking ? wrap(breaking, wrapOptions) : false;
}

function constructIssues(answers, wrapOptions) {
  const { issues } = answers;
  return issues ? wrap(issues, wrapOptions) : false;
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
