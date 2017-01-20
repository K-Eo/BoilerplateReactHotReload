var chalk = require('chalk');
var config = require('./config/webpack.config');
var express = require('express');
var util = require('./utils/util');
var webpack = require('webpack');

var app = express();
var PORT = process.env.PORT || process.env.npm_package_config_express || 3000;

/**
 * Express configuration
 */
app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

/**************
 * Main Entry *
 **************/

util.handleExit();
util.clear();

console.log(
  chalk.white.bold('Build for Production\n')
);

util.clean().then(function() {

  return util.copyAssets();

}).then(function() {
  return new Promise(function(resolve, reject) {
    var compiler = webpack(config.productionConfig());

    process.stdout.write(
      chalk.white.bgBlue.bold('  BUILDING  ')
    );

    compiler.run(function(error, stats) {

      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (error) {

        console.log(
          '%s %s',
          chalk.white.bgRed.bold('  ERROR  '),
          chalk.white.bold('Build')
        );

        console.log();
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));

        reject();

      } else {

        console.log(
          '%s %s',
          chalk.white.bgGreen.bold('  OK  '),
          chalk.white.bold('Build')
        );

        resolve(stats.toString({
          chunks: false,
          colors: true
        }));

      }

    });
  });
}).then(function(stats) {

  process.stdout.write(
    chalk.white.bgBlue.bold('  INIT  ') +
    chalk.white.bold(' Server')
  );

  app.listen(PORT, function(error) {

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (error) {

      console.log(
        '%s %s %s',
        chalk.white.bgRed.bold('  ERROR  '),
        chalk.white.bold('Server'),
        chalk.white('Initialization')
      );
      console.error(error);

      return;

    }

    console.log(
      '%s %s %s',
      chalk.white.bgGreen.bold('  OK  '),
      chalk.white.bold('Server'),
      chalk.white('Initialization')
    );

    console.log('\n');
    console.log(stats);
    console.log('\n');

    console.log(
      chalk.white.bold('App is ready and running on default port %s.'),
      PORT
    );
  });
}).catch(function() {});
