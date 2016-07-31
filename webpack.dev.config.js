var Config = require('webpack-config').Config;

module.exports = new Config().extend('webpack.base.config.js').merge({
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  debug: true,
  devtool: 'cheap-module-eval-source-map'
});
