const chalk = require('chalk');

const { options, choices } = require('./config');
const constructCommitMessage = require('./constructCommitMessage');
const { maxSummaryLength, filterSubject } = require('./utils');

const adapter = {
  // When a user runs `git cz`, prompter will
  // be executed. We pass you cz, which currently
  // is just an instance of inquirer.js. Using
  // this you can ask questions and get answers.
  //
  // The commit callback should be executed when
  // you're ready to send back a commit template
  // to git.
  //
  // By default, we'll de-indent your commit
  // template and will keep empty lines.
  prompter(cz, commit) {
    // Let's ask some questions of the user
    // so that we can populate our commit
    // template.
    //
    // See inquirer.js docs for specifics.
    // You can also opt to use another input
    // collection library if you prefer.
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: "Select the type of change that you're committing:",
        default: options.defaultType,
        choices,
      },
      {
        type: 'input',
        name: 'scope',
        message: 'What is the scope of this change (e.g. component or file name): (press enter to skip)',
        default: options.defaultScope,
        filter(value) {
          return value.trim().toLowerCase();
        },
      },
      {
        type: 'input',
        name: 'subject',
        message(answers) {
          const maxLength = maxSummaryLength(options, answers);
          return `Write a summary description of your changes in imperative mood (max ${maxLength} chars):\n`;
        },
        default: options.defaultSubject,
        validate(subject, answers) {
          const maxLength = maxSummaryLength(options, answers);
          const filteredSubject = filterSubject(subject);
          const currentLength = filteredSubject.length;

          if (currentLength === 0) {
            return 'subject is required';
          }

          if (currentLength > maxLength) {
            return `Subject length must be less than or equal to ${maxLength} characters. Current length is ${currentLength} characters.`;
          }

          return true;
        },
        transformer(subject, answers) {
          const maxLength = maxSummaryLength(options, answers);
          const filteredSubject = filterSubject(subject);
          const currentLength = filteredSubject.length;
          const color = currentLength <= maxLength ? chalk.green : chalk.red;
          return color(`(${currentLength}) ${subject}`);
        },
        filter(subject) {
          return filterSubject(subject);
        },
      },
      {
        type: 'input',
        name: 'body',
        message: 'Provide a longer description of the change: (press enter to skip)\n',
        default: options.defaultBody,
      },
      {
        type: 'confirm',
        name: 'isBreaking',
        message: 'Are there any breaking changes?',
        default: false,
      },
      {
        type: 'input',
        name: 'breakingBody',
        message: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
        default: '-',
        when(answers) {
          return answers.isBreaking && !answers.body;
        },
        validate(breakingBody) {
          const breakingBodyLength = breakingBody.trim().length;
          return breakingBodyLength > 0 || 'Body is required for BREAKING CHANGE';
        },
      },
      {
        type: 'input',
        name: 'breaking',
        message: 'Describe the breaking changes:\n',
        when(answers) {
          return answers.isBreaking;
        },
        transformer(breaking) {
          return `${chalk.yellow('BREAKING CHANGE:')} ${breaking}`;
        },
      },
      {
        type: 'confirm',
        name: 'isIssueAffected',
        message: 'Does this change affect any open issues?',
        default: !!options.defaultIssues,
      },
      {
        type: 'input',
        name: 'issuesBody',
        message: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n',
        default: '-',
        when(answers) {
          return answers.isIssueAffected && !answers.body && !answers.breakingBody;
        },
      },
      {
        type: 'input',
        name: 'issues',
        message: 'Add issue references (e.g. "Fixes #123", "Closes #123", "Refs #123".):\n',
        default: options.defaultIssues,
        when(answers) {
          return answers.isIssueAffected;
        },
      },
    ])
      .then((answers) => constructCommitMessage(answers, options))
      .then((commitMessage) => {
        commit(commitMessage);
      });
  },
};

module.exports = adapter;
