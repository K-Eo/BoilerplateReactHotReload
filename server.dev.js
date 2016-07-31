const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./data/schema');

const app = express();
const PORT = process.env.PORT || process.env.npm_package_config_express || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.use('/graphql', graphqlHTTP( () => ({
  schema
})));

app.use('/graphqli', graphqlHTTP( () => ({
  schema,
  graphiql: true,
  pretty: true
})));

app.listen(PORT, function () {
  process.stdout.write(`Express server is up on port ${PORT}\n`);
});
