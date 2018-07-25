const fs = require('fs');
const path = require('path');
const commandsPath = path.resolve(__dirname, './commands');
const commands = fs.readdirSync(commandsPath);
function setup(program){
  commands.forEach((command) => {
    const commandModulePath = path.join(commandsPath, command);
    // TODO: check if the command exist
    const useCommand = require(commandModulePath);
    useCommand(program);

  });
}

module.exports = setup;