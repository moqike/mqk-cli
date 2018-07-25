const updateNotifier = require('update-notifier');
const fs = require('fs');
const path = require('path');

function getLocalPackageJson(name) {
  let packageJson = null;
  try {
    packageJson = fs.readFileSync(path.resolve(__dirname, `../../node_modules/${name}/package.json`), 'utf-8');
    packageJson = JSON.parse(packageJson);
  } catch (e) {
    // TODO: catch other errors
  }
  return packageJson;
}

/**
 * return null if the module is not installed
 * returns update information like following.
 * {
 *   latest: '2.4.1',
 *   current: '2.4.1',
 *   type: 'latest',
 *   name: 'chalk'
 * }
 * @param name module name
 */
function checkNpmModule(name){
  const result = new Promise((resolve, reject) => {
    const localPackageJson = getLocalPackageJson(name);
    if (localPackageJson) {
      updateNotifier({
        pkg: {
          name: name,
          version: localPackageJson.version
        },
        callback: (error, update) => {
          if (error) {
            resolve(error);
          } else {
            console.log(update);
            resolve(update);
          }
        }
      });
    } else {
      resolve(null);
    }
  })
  return result;
}

module.exports.checkNpmModule = checkNpmModule;