const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.hotreload.config');
const util = require('./utils/util');

const DEV_PORT = process.env.npm_package_config_dev || 3000;
let isFirstClear = true;

function clearConsole() {
  process.stdout.write(isFirstClear ? '\x1bc' : '\x1b[2J\x1b[0f');
  isFirstClear = false;
}

clearConsole();

util.clean().then(function() {
  return util.copyAssets();
}).then(function() {
  console.log();
  console.log('Compiling...');
  return null;
}).catch(function() {});

const compiler = webpack(config);

compiler.plugin('invalid', function() {
  clearConsole();
  console.log('Compiling...');
});

compiler.plugin('done', function(stats) {
  clearConsole();
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

devServer.listen(
  DEV_PORT,
  function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log(util.green('Server OK'));
  }
);
