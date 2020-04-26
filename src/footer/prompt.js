const chalk = require('chalk');

const options = require('../options');
const { supportedKeys, skipKeys } = require('./data');
const { filterTrailerValue } = require('./utils');

module.exports = function prompt(cz, previousTrailerNumber = 0, previousTrailers = []) {
  const trailerNumber = previousTrailerNumber + 1;
  const trailers = [...previousTrailers];

  return cz.prompt([
    {
      type: 'list',
      name: 'trailerKey',
      message: 'Select the key for the trailer',
      choices: [...supportedKeys, trailerNumber === 1 ? skipKeys[0] : skipKeys[1]],
    },
    {
      type: 'input',
      name: 'trailerValue',
      message(answers) {
        const keyLength = answers.trailerKey.length;
        const maxValueLength = options.maxLineWidth - keyLength - 2;
        return `Enter the trailer value (max ${maxValueLength} chars) (press enter to skip):\n`;
      },
      when(answers) {
        return supportedKeys.includes(answers.trailerKey);
      },
      transformer(trailerValue, answers) {
        const keyLength = answers.trailerKey.length;
        const filteredTrailerValue = filterTrailerValue(trailerValue);
        const valueLength = filteredTrailerValue.length;
        const maxValueLength = options.maxLineWidth - keyLength - 2;
        const color = valueLength > maxValueLength ? chalk.red : chalk.green;
        return `${color(`(${valueLength})`)} ${chalk.magenta(`${answers.trailerKey}:`)} ${color(`${trailerValue}`)}`;
      },
      validate(trailerValue, answers) {
        const keyLength = answers.trailerKey.length;
        const filteredTrailerValue = filterTrailerValue(trailerValue);
        const valueLength = filteredTrailerValue.length;
        const maxValueLength = options.maxLineWidth - keyLength - 2;

        if (valueLength > maxValueLength) {
          return `Trailer value length must be less than or equal to ${maxValueLength} characters. Current length is ${valueLength} characters.`;
        }

        return true;
      },
      filter(trailerValue) {
        return filterTrailerValue(trailerValue);
      },
    },
    {
      type: 'confirm',
      name: 'moreTrailers',
      message: 'Do you want to add more trailers?',
      default: false,
      when(answers) {
        return answers.trailerKey && answers.trailerValue;
      },
    },
  ])
    .then(({ trailerKey, trailerValue, moreTrailers }) => {
      const doesTrailerExist = trailerKey && trailerValue;

      if (doesTrailerExist) {
        trailers.push({ key: trailerKey, value: trailerValue });
      }

      if (doesTrailerExist && moreTrailers) {
        return prompt(cz, trailerNumber, trailers);
      }

      return trailers;
    });
};
