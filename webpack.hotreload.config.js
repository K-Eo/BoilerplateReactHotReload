var Config = require('webpack-config').Config;
var webpack = require('webpack');

var HOTRELOAD_PORT = process.env.npm_package_config_hotreload || 3004;
var GRAPHQL_PORT = process.env.npm_package_config_graphql || 3002;

module.exports = new Config().extend('webpack.dev.config.js').merge({
  entry: [
    `webpack-dev-server/client?http://localhost:${HOTRELOAD_PORT}`,
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('hot'),
        GRAPHQL_PORT: JSON.stringify(GRAPHQL_PORT)
      }
    })
  ]
});
