var Config = require('webpack-config').Config;
var webpack = require('webpack');

module.exports = new Config().extend('webpack.base.config.js').merge({
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  debug: false
});
