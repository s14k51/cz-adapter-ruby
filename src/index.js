const headerPrompt = require('./header/prompt');
const bodyPrompt = require('./body/prompt');
const footerPrompt = require('./footer/prompt');
const constructHeader = require('./header/construct');
const { constructBody, constructBreaking } = require('./body/construct');
const constructFooter = require('./footer/construct');

const { filter } = require('./utils');

const adapter = {
  prompter(cz, commit) {
    const answerChunks = [];

    Promise.resolve()
      .then(() => headerPrompt(cz))
      .then(({ type, scope, subject }) => {
        answerChunks.push(type, scope, subject);
      })
      .then(() => bodyPrompt(cz))
      .then(({ body, breaking }) => {
        answerChunks.push(body, breaking);
      })
      .then(() => footerPrompt(cz))
      .then((trailers) => {
        answerChunks.push(trailers);
      })
      .then(() => {
        const header = constructHeader(answerChunks);
        const body = constructBody(answerChunks);
        const breaking = constructBreaking(answerChunks);
        const footer = constructFooter(answerChunks);

        const commitMessage = filter([header, body, breaking, footer]).join('\n\n');
        commit(commitMessage);
      })
      .catch((error) => {
        commit(error);
      });
  },
};

module.exports = adapter;
