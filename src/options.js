const { configureWidths } = require('conventional-ruby-commit-types');

const widths = configureWidths();
const options = {
  ...widths,
  defaultType: 'feat',
  defaultScope: undefined,
  defaultSubject: undefined,
  defaultBody: undefined,
};

module.exports = options;
