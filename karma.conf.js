var webpackConfig = require('./webpack.dev.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    files: [
      'app/tests/**/*.test.jsx'
    ],
    preprocessors: {
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
