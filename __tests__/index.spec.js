// Write your tests here

const projectSource = require('../src');

describe('cz-adapter-ruby', () => {
  it('index', () => {
    expect(projectSource).toStrictEqual('code');
  });
});
