const wrap = require('word-wrap');

const options = require('../options');

const wrapOptions = {
  trim: true,
  cut: false,
  newline: '\n',
  indent: '',
  width: options.maxLineWidth,
};

function constructBody(answers) {
  const [, , , body] = answers;
  return body ? wrap(body, wrapOptions) : false;
}

function constructBreaking(answers) {
  const [, , , , breaking] = answers;
  let optionalBreaking = breaking ? breaking.trim() : '';
  optionalBreaking = optionalBreaking ? `BREAKING CHANGE: ${optionalBreaking.replace(/^BREAKING CHANGE: /, '')}` : '';
  return optionalBreaking ? wrap(optionalBreaking, wrapOptions) : false;
}

module.exports = {
  constructBody,
  constructBreaking,
};
