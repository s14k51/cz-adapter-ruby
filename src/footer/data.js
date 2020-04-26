/**
 *  See:
 *  https://git-scm.com/docs/git-interpret-trailers
 *  https://github.com/conventional-commits/conventionalcommits.org/issues/179
 */
const supportedKeys = [
  'Closes',
  'Fixes',
  'Refs',
  'See-Also',
  'Cc',
  'Co-Authored-By',
  'Reviewed-By',
  'Signed-Off-By',
  'Acked-By',
];

const skipKeys = [
  '(skip adding footer)',
  '(skip this trailer)',
];

module.exports = {
  supportedKeys,
  skipKeys,
};
