var chalk = require('chalk');
var config = require('./config/webpack.config');
var util = require('./utils/util');
var webpack = require('webpack');

exports.build = function() {
  return util.clean().then(function() {

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
  });

}
