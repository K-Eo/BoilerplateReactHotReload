var {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

/**
 *  Root Query
 */
const queryRoot = new GraphQLObjectType({
  name: 'Query',
  description: 'Query Root Object',
  fields: {
    welcome: {
      type: GraphQLString,
      description: 'Get GraphQL welcome message',
      resolve: function() {
        return 'Welcome to GraphQL';
      }
    }
  }
});

/**
 *  GraphQL Schema
 */
const schema = new GraphQLSchema({
  query: queryRoot
});

module.exports = schema;
