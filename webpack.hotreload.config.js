var Config = require('webpack-config').Config;
var webpack = require('webpack');

var DEV_PORT = process.env.npm_package_config_dev || 3000;

module.exports = new Config().extend({'webpack.dev.config.js': config => {
  config.module.loaders.shift();
  return config;
}}).merge({
  entry: [
    `webpack-dev-server/client?http://localhost:${DEV_PORT}`,
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('hot')
      }
    })
  ],
  module: {
    loaders: [
      {
        loaders: ['react-hot', 'babel-loader'],
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
});
