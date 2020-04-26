const chalk = require('chalk');

const options = require('../options');

module.exports = function prompt(cz) {
  return cz.prompt([
    {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the changes: (press enter to skip)\n',
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
      message: 'In the header, do you want to draw attention to breaking changes if any?',
      default: false,
    },
  ]);
};
