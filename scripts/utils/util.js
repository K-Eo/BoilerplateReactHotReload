const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

const green = exports.green = function(text) {
  return `\u001B[1m\u001B[32m${text}\u001B[2m\u001B[37m`;
};

const red = exports.red = function(text) {
  return `\u001B[1m\u001B[31m${text}\u001B[2m\u001B[37m`;
};

exports.warning = function(text) {
  return `\u001B[1m\u001B[33m${text}\u001B[2m\u001B[37m`;
};

exports.clean = function() {
  const cleanPromise = new Promise(function(resolve, reject) {
    process.stdout.write('Cleaning public/ directory...');
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    rimraf('public/*', function(error) {
      if (error) {
        console.log(red('Clean ERROR'));
        console.log(error);
        reject();
      } else {
        console.log(green('Clean OK'));
        resolve();
      }
    });
  });

  return cleanPromise;
};

exports.copyAssets = function(callback) {
  const copyPromise = new Promise(function(resolve, reject) {
    process.stdout.write('Copying assets to public directory...');
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    ncp('./app/assets/', './public', function(error) {
      if (error) {
        console.log(red('Assets  ERROR'));
        console.log('Error on copy assets %s', error);
        reject();
      } else {
        console.log(green('Assets  OK'));
        resolve();
      }
    });
  });

  return copyPromise;
};
