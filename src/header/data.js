const { types, typesInfo } = require('conventional-ruby-commit-types');
const longest = require('longest');

const length = longest(types).length + 1;
const supportedTypes = types.map((type) => ({
  name: `${(`${type}:`).padEnd(length)} ${typesInfo[type].description}`,
  value: type,
}));

module.exports = {
  supportedTypes,
};
