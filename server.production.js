var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./data/schema');

var app = express();
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

app.listen(PORT, function () {
  process.stdout.write(`Express server is up on port ${PORT}\n`);
});
