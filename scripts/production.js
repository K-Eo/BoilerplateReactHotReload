const webpack = require('webpack');
const express = require('express');
const util = require('./utils/util');
const config = require('./config/webpack.config');

const app = express();
const PORT = process.env.PORT || process.env.npm_package_config_express || 3000;

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

console.log('Build for Production\n');

util.clean().then(function() {
  return util.copyAssets();
}).then(function() {
  return new Promise(function(resolve, reject) {
    const compiler = webpack(config.productionConfig());
    process.stdout.write('Compiling...');
    compiler.run(function(error, stats) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (error) {
        console.log(util.red('Compilation ERROR'));
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));
        reject();
      } else {
        console.log(util.green('Compilation OK'));
        resolve(stats.toString({
          chunks: false,
          colors: true
        }));
      }

    });
  });
}).then(function(stats) {
  process.stdout.write('Starting server...');
  app.listen(PORT, function() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(util.green('Server OK'));
    console.log('\n');
    console.log(stats);
    console.log('\n');
    console.log('App is ready and running on default port %s.', PORT);
  });
}).catch(function() {});
