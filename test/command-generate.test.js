const assert = require('assert');
const chalk = require('chalk');
const sinon = require('sinon');
const inquirer = require('inquirer');
const sandbox = sinon.createSandbox();
describe('Generate command', function() {
  describe('command: mqk g', function() {
    let program;

    before(function() {
      program = require('../index');
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('can not use \'test-template\'', function(done) {
      // select template type
      sandbox.stub(inquirer, 'prompt').onCall(0).resolves({
        type: 'test-template'
      });
      // print error as test-template is not installed
      sandbox.stub(console, 'log').onCall(0).callsFake(function(content) {
        try {
          assert.equal(content,
            chalk.red(
`
Module: mqk-template-test-template is not installed!
Install with the command: npm i -g mqk-template-test-template@latest
`
            )
          );
          done();
        } catch (e) {
          done(e);
        }
      });
      program.parse([
        '',
        '',
        'g'
      ]);
    });
  });
});