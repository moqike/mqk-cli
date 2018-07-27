'use strict';

const program = require('commander');
const packageInfo = require('./package.json');
const setup = require('./lib/setup');

program.version(packageInfo.version, '-v, --version');
setup(program);

module.exports = program;
