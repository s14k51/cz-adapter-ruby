const chalk = require('chalk');

const options = require('../options');
const { supportedTypes } = require('./data');
const { maxSummaryLength, filterSubject } = require('./utils');

module.exports = function prompt(cz) {
  return cz.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of the change that you are committing:',
      default: options.defaultType,
      choices: supportedTypes,
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
        return `Write a summary description of the change in imperative mood (max ${maxLength} chars):\n`;
      },
      default: options.defaultSubject,
      validate(subject, answers) {
        const maxLength = maxSummaryLength(options, answers);
        const filteredSubject = filterSubject(subject);
        const currentLength = filteredSubject.length;
        if (currentLength === 0) {
          return 'Subject is required';
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
  ]);
};
