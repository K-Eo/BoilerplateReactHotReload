var chalk = require('chalk');
var util = require('./utils/util');
var deploy = require('./build');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var command = 'firebase deploy';

function deployToFirebase() {
  var firebase = spawn('firebase', ['deploy'], { stdio: 'inherit' });

  firebase.on('close', function(code) {

    if (code === 0) {

      console.log(
        '\n%s %s',
        chalk.white.bgGreen.bold('  OK  '),
        chalk.white.bold('Deploy to Firebase')
      );

    } else {

      console.log(
        '\n%s %s',
        chalk.white.bgRed.bold('  ERROR  '),
        chalk.white.bold('Deploy to Firebase')
      );

    }

  });

}

function runTests() {
  var jest = spawn('npm', ['test'], { stdio: 'inherit' });

  jest.on('close', function(code) {

    if (code === 0) {

      console.log(
        '\n%s %s',
        chalk.white.bgGreen.bold('  OK  '),
        chalk.white.bold('Tests')
      );

      deploy.build().then(function() {

        deployToFirebase();

      });

      return;

    } else {

      console.log(
        '\n%s %s',
        chalk.white.bgRed.bold('  ERROR  '),
        chalk.white.bold('Tests')
      );

    }

  });

}

function checkMasterBranch(error, stdout) {

  if (error) {

    console.log(
      '%s %s',
      chalk.white.bgRed.bold('  ERROR  '),
      chalk.white.bold('master branch')
    );

    console.error(error);

    return;

  }

  if (stdout.indexOf('master') === -1) {

    console.log(
      '%s %s\n',
      chalk.white.bgRed.bold('  ERROR  '),
      chalk.white.bold('master branch - You can only deploy from master branch')
    );

  } else {

    console.log(
      '%s %s',
      chalk.white.bgGreen.bold('  OK  '),
      chalk.white.bold('master branch')
    );

    runTests();
  }

}

util.handleExit();
util.clear();

console.log(chalk.white.bgGreen.bold('\n\n  NEW DEPLOY STARTED  \n\n'));

exec('git branch | grep "\*"', checkMasterBranch);
