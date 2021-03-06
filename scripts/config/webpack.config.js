const path = require('path');
const webpack = require('webpack');
const envFile =  require('node-env-file');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const network = require('../utils/network');

const defaultIP = network.getDefaultIP();

/**
 * Get the root path
 * @type {string}
 */
const dirname = process.cwd();

/**
 * Get process enviroment
 * @type {string}
 */
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Parse the configuration variables
 */
try {
  envFile(path.join(dirname, 'config/' + NODE_ENV + '.env'));
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
    }),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],
  resolve: {
    root: dirname,
    modulesDirectories: [
      'node_modules'
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
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000!img?progressive=true'
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
    `webpack-dev-server/client?http://${defaultIP}:${port}`,
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

  dev.devtool = 'cheap-module-eval-source-map';

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
    })
  );

  production.debug = false;

  return production;
};
