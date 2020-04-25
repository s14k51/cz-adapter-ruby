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
        type: 'input',
        name: 'breaking',
        message: "Describe 'BREAKING CHANGES' if any: (press enter to skip)\n",
        transformer(breaking) {
          return `${chalk.yellow('BREAKING CHANGE:')} ${breaking}`;
        },
      },
      {
        type: 'confirm',
        name: 'doIndicateBreaking',
        message: "In the header, do you want to add the '!' indicator to draw attention to breaking changes if any?",
        default: false,
      },
      {
        type: 'input',
        name: 'issues',
        message: 'Add issue references if any (e.g. "Closes: #123", "Fixes: #123", "Refs: #123".): (press enter to skip)\n',
      },
    ])
      .then((answers) => constructCommitMessage(answers, options))
      .then((commitMessage) => {
        commit(commitMessage);
      });
  },
};

module.exports = adapter;
