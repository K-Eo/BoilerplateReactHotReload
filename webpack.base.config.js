var path = require('path');
var Config = require('webpack-config').Config;
var webpack = require('webpack');
var envFile = require('node-env-file');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'env/' + process.env.NODE_ENV + '.env'));
} catch (e) {
  // console.error(e);
}

module.exports = new Config().merge({
  entry: [
    'script!jquery/dist/jquery.min.js',
    './app/main.jsx'
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
      template: './app/templates/index.ejs'
    })
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/api',
      './app/actions',
      './app/components',
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
