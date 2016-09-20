const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.hotreload.config');
const util = require('./utils/util');

const DEV_PORT = process.env.npm_package_config_dev || 3000;

const compiler = webpack(config);

/**
 * Handle compiler events
 */
compiler.plugin('invalid', function() {
  util.clear();
  console.log('Compiling...');
});

compiler.plugin('done', function(stats) {
  util.clear();
  const hasErrors = stats.hasErrors();
  const hasWarnings = stats.hasWarnings();

  if (hasErrors || hasWarnings) {
    console.log(util.red('Compilation ERROR'));
    console.log();
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
    return;
  }

  console.log(util.green('Compilation OK'));
  console.log();
  console.log('Go to http://localhost:%s', DEV_PORT);
});

/**
 * Configure dev server
 * @type {WebpackDevServer}
 */
const devServer = new WebpackDevServer(
  compiler,
  {
    publicPath: config.output.publicPath,
    contentBase: './public/',
    hot: true,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  }
);

util.handleExit();
util.clear();

/**
 * Clean and copy assets to public directory
 */
util.clean().then(function() {
  return util.copyAssets();
}).then(function() {
  devServer.listen(
    DEV_PORT,
    function(error) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(util.green('Server OK'));
      console.log();
      console.log('Compiling...');
    }
  );
}).catch(function() {});

/**
 * Start dev server
 */
