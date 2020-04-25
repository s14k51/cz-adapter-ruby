const { conventionalRubyTypes, conventionalRubyTypesInfo } = require('conventional-ruby-commit-types');
const longest = require('longest');

const length = longest(conventionalRubyTypes).length + 1;
const supportedTypes = conventionalRubyTypes.map((type) => ({
  name: `${(`${type}:`).padEnd(length)} ${conventionalRubyTypesInfo[type].description}`,
  value: type,
}));

module.exports = {
  supportedTypes,
};
