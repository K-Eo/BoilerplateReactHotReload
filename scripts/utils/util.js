const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

let isFirstClear = true;

exports.clear = function() {
  process.stdout.write(isFirstClear ? '\x1bc' : '\x1b[2J\x1b[0f');
  isFirstClear = false;
};

exports.handleExit = function() {
  if (process.platform === 'win32') {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('SIGINT', function() {
      process.emit('SIGINT');
    });
  }

  process.on('SIGINT', function() {
    process.exit();
  });
};

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
    rimraf('public/*', function(error) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
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
    ncp('./app/assets/', './public', function(error) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
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
