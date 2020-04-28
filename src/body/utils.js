function filterBody(body) {
  let filteredBody = body.trim();

  while (filteredBody.endsWith('.')) {
    filteredBody = filteredBody.slice(0, -1);
  }

  return filteredBody;
}

module.exports = {
  filterBody,
};
