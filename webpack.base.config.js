var path = require('path');
var Config = require('webpack-config').Config;
var webpack = require('webpack');
var envFile = require('node-env-file');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'env/' + process.env.NODE_ENV + '.env'));
} catch (e) {
  // console.error(e);
}

module.exports = new Config().merge({
  entry: [
    'script!jquery/dist/jquery.min.js',
    './app/app.jsx'
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[hash].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './templates/index.ejs'
    })
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/components/conductores',
      './app/api',
      './app/actions',
      './app/reducers',
      './app/store'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss'
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
  },
  externals: {
    jquery: 'jQuery'
  }
});
