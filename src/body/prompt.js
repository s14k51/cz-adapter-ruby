const chalk = require('chalk');

const options = require('../options');
const { filterBody } = require('./utils');

module.exports = function prompt(cz) {
  return cz.prompt([
    {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the changes: (press enter to skip)\n',
      default: options.defaultBody,
      filter(body) {
        return filterBody(body);
      },
    },
    {
      type: 'input',
      name: 'breaking',
      message: "Describe 'BREAKING CHANGES' if any: (press enter to skip)\n",
      transformer(breaking) {
        return `${chalk.yellow('BREAKING CHANGE:')} ${breaking}`;
      },
      filter(breaking) {
        return filterBody(breaking);
      },
    },
  ]);
};
