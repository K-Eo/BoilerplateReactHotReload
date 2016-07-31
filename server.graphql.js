const express = require('express'),
  graphqlHTTP = require('express-graphql'),
  schema = require('./data/schema');

const app = express();

const GRAPHQL_PORT = process.env.npm_package_config_graphql || 3002;

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
