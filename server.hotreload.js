const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.hotreload.config');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./data/schema');

const app = express();

const HOTRELOAD_PORT = process.env.npm_package_config_hotreload || 3004;
const GRAPHQL_PORT = process.env.npm_package_config_graphql || 3002;

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);

app.use('/graphql', graphqlHTTP( () => ({
  schema
})));

app.use('/graphqli', graphqlHTTP( () => ({
  schema,
  graphiql: true,
  pretty: true
})));

app.listen(GRAPHQL_PORT, function(error) {
  if (error) {
    return process.stdout.write(`${error}\n`);
  }
  process.stdout.write(`Graphql server is up on port ${GRAPHQL_PORT}\n`);
});

new WebpackDevServer(webpack(config),
  {
    publicPath: config.output.publicPath,
    contentBase: './public/',
    hot: true,
    historyApiFallback: true
  }).listen(HOTRELOAD_PORT, function (error) {
    if (error) {
      return process.stdout.write(error);
    }
    process.stdout.write(`Hot-Reload server listening at http://localhost:${HOTRELOAD_PORT}/\n`);
  });

