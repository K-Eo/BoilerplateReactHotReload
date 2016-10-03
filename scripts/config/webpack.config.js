const path = require('path');
const webpack = require('webpack');
const envFile =  require('node-env-file');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Get the root path
 * @type {string}
 */
const dirname = process.cwd();

/**
 * Parse the configuration variables
 */
try {
  envFile(path.join(dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {}

/**
 * Basic webpack configuration
 * @type {Object}
 */
const baseConfig = {
  entry: [
    path.join(dirname, '/app/main.jsx')
  ],
  output: {
    path: path.join(dirname, '/public/'),
    filename: '[hash].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(dirname, '/app/templates/index.ejs')
    })
  ],
  resolve: {
    root: dirname,
    modulesDirectories: [
      'node_modules',
      './app/actions',
      './app/components',
      './app/reducers',
      './app/store'
    ],
    alias: {
      applicationStyles: path.join(dirname, '/app/styles/app.scss')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};

/**
 * Configures a development preview webpack configuration object
 * @return {Object} Webpack configuration object
 */
exports.previewConfig = function() {
  let preview = baseConfig;

  preview.debug = true;
  preview.devtool = 'cheap-module-eval-source-map';

  return preview;
};

/**
 * Configures a development webpack configuration object
 * @param  {string} port Server port to listen
 * @return {Object}      Webpack object
 */
exports.devConfig = function(port) {
  let dev = baseConfig;

  dev.entry.push(
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server'
  );

  dev.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  dev.module.loaders.shift();
  dev.module.loaders.unshift(
    {
      loaders: ['react-hot', 'babel-loader'],
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/
    }
  );

  return dev;
};

/**
 * Configures a production webpack configuration object
 * @return {object} Webpack object
 */
exports.productionConfig = function() {
  let production = baseConfig;

  production.plugins.push(
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
      'process.env' : {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );

  production.debug = false;

  return production;
};
