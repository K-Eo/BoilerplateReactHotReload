var chalk = require('chalk');
var rimraf = require('rimraf');
var ncp = require('ncp').ncp;

var isFirstClear = true;

/**
 * Clear the terminal
 * @return {void}
 */
exports.clear = function() {
  process.stdout.write(isFirstClear ? '\x1bc' : '\x1b[2J\x1b[0f');
  isFirstClear = false;
};

/**
 * Handles exit properly on SIGINT
 * @return {void}
 */
exports.handleExit = function() {
  if (process.platform === 'win32') {
    var rl = require('readline').createInterface({
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

/**
 * Renders green text
 * @type {string}
 */
var green = exports.green = function(text) {
  return `\u001B[1m\u001B[32m${text}\u001B[2m\u001B[37m`;
};

/**
 * Renders red text
 * @type {string}
 */
var red = exports.red = function(text) {
  return `\u001B[1m\u001B[31m${text}\u001B[2m\u001B[37m`;
};

/**
 * Renders yellow text
 * @param  {string} text String to render
 * @return {string}
 */
exports.yellow = function(text) {
  return `\u001B[1m\u001B[33m${text}\u001B[2m\u001B[37m`;
};

/**
 * Clean the public directory
 * @return {Promise}
 */
exports.clean = function() {
  var cleanPromise = new Promise(function(resolve, reject) {

    process.stdout.write(
      chalk.white.bgBlue.bold('  CLEANING  ')
    );

    rimraf('public/*', function(error) {

      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (error) {

        console.log(
          '%s %s %s',
          chalk.white.bgRed.bold('  ERROR  '),
          chalk.white.bold('Clean'),
          chalk.white('public/')
        );
        console.error(error);
        reject();

      } else {

        console.log(
          '%s %s %s',
          chalk.white.bgGreen.bold('  OK  '),
          chalk.white.bold('Clean'),
          chalk.white('public/')
        );
        resolve();

      }
    });
  });

  return cleanPromise;
};

/**
 * Copy assets to public directory
 * @return {Promise}
 */
exports.copyAssets = function() {
  var copyPromise = new Promise(function(resolve, reject) {

    process.stdout.write(
      chalk.white.bgBlue.bold('  COPYING  ')
    );

    ncp('./app/assets/', './public', function(error) {

      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (error) {

        console.log(
          '%s %s %s',
          chalk.white.bgRed.bold('  ERROR  '),
          chalk.white.bold('Copy'),
          chalk.white('Assets')
        );
        console.error(error);
        reject();

      } else {

        console.log(
          '%s %s %s',
          chalk.white.bgGreen.bold('  OK  '),
          chalk.white.bold('Copy'),
          chalk.white('Assets')
        );
        resolve();

      }
    });
  });

  return copyPromise;
};
