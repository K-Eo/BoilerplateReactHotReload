var chalk = require('chalk');
var config = require('./config/webpack.config');
var util = require('./utils/util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var DEV_PORT = process.env.npm_package_config_dev || 3000;

var conf = config.devConfig(DEV_PORT);
var compiler = webpack(conf);

/**
 * Handle compiler events
 */
compiler.plugin('invalid', function() {

  util.clear();
  console.log(
    chalk.white.bgBlue.bold('  BUILDING  ')
  );

});

compiler.plugin('done', function(stats) {
  util.clear();
  var hasErrors = stats.hasErrors();
  var hasWarnings = stats.hasWarnings();

  if (hasErrors || hasWarnings) {

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
    return;

  }

  console.log(
    chalk.white.bold('Build for Development with Hot-Reload\n')
  );
  console.log(
    '%s %s',
    chalk.white.bgGreen.bold('  OK  '),
    chalk.white.bold('Build')
  );
  console.log();
  console.log(
    chalk.white.bold('Go to http://localhost:%s'),
    DEV_PORT
  );
});

/**
 * Configure dev server
 * @type {WebpackDevServer}
 */
var devServer = new WebpackDevServer(
  compiler,
  {
    publicPath: conf.output.publicPath,
    contentBase: conf.output.path,
    hot: true,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  }
);

/**************
 * Main Entry *
 **************/

util.handleExit();
util.clear();

console.log(
  chalk.white.bold('Build for Development with Hot-Reload\n')
);

/**
 * Clean and copy assets to public directory
 */
util.clean().then(function() {

  return util.copyAssets();

}).then(function() {

  process.stdout.write(
    chalk.white.bgBlue.bold('  INIT  ') +
    chalk.white.bold(' Server')
  );


  devServer.listen(
    DEV_PORT,
    function(error) {

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
      console.log();
      console.log(
        chalk.white.bgBlue.bold('  BUILDING  ')
      );

    }
  );

}).catch(function(error) {
  console.log(chalk.white.bgRed.bold('  CRITICAL ERROR  '));
  console.error(error);
});
