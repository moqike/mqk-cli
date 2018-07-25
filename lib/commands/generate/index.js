'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const checkNpmModule = require('../../common/npm').checkNpmModule;

const TYPES = [
  'react-component-with-jss'
]

function isValidType(type) {
  return !(TYPES.indexOf(type) === -1);
}

async function selectType(type) {
  let result = null;
  if (isValidType(type)) {
    result = type;
    console.log(chalk.blue(`generate: ${type}`));
  } else {
    result = (await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'What do you want to generate?',
      choices: TYPES
    })).type;
  }
  return result;
}

function useCommand(program) {
  program
    .command('generate [type]')
    .alias('g')
    .description(
    `Generate templates for your
  <type>: ${TYPES.join('|')}
    `)
    .action(async (type) => {
      const selectedType = await selectType(type);
      const templateModuleName = `mqk-template-${selectedType}`;
      const templateModuleInfo = await checkNpmModule(templateModuleName);
      if (!templateModuleInfo) {
        console.log(chalk.red(`
Module: ${templateModuleName} is not installed!
Install with the command: npm i ${templateModuleName}@latest --save-dev
                      or: yarn add ${templateModuleName}@latest --dev
        `));
      } else {
        if (templateModuleInfo.type !== 'latest') {
          console.log(JSON.stringify(templateModuleInfo));
          console.log(chalk.yellow(
`
Module: ${templateModuleName} is out of date!
The latest version is: ${templateModuleInfo.latest},  current version is: ${templateModuleInfo.current}
You can update with the command: npm up ${templateModuleName}
                      or: yarn add ${templateModuleName}@latest --dev
`
          ))
        }
        const templateGenerator = require(templateModuleName);
        templateGenerator(path.resolve('./'));
      }
    });
}



module.exports = useCommand;