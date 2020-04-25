// See https://git-scm.com/docs/git-interpret-trailers
const supportedKeys = [
  'Closes',
  'Fixes',
  'Refs',
  'See-also',
  'Cc',
  'Reviewed-by',
  'Signed-off-by',
  'Acked-by',
];

const skipKeys = [
  '(skip adding footer)',
  '(skip this trailer)',
];

module.exports = {
  supportedKeys,
  skipKeys,
};
