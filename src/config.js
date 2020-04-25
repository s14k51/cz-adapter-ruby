const {
  configureWidths,
  conventionalRubyTypes,
  conventionalRubyTypesInfo,
} = require('conventional-ruby-commit-types');
const longest = require('longest');

const widths = configureWidths();
const options = {
  ...widths,
  defaultType: 'feat',
  defaultScope: undefined,
  defaultSubject: undefined,
  defaultBody: undefined,
};

const length = longest(conventionalRubyTypes).length + 1;
const choices = conventionalRubyTypes.map((type) => ({
  name: `${(`${type}:`).padEnd(length)} ${conventionalRubyTypesInfo[type].description}`,
  value: type,
}));

module.exports = {
  options,
  choices,
};
