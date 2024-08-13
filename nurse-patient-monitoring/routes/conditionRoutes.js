const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const router = express.Router();

// Endpoint to handle condition-related GraphQL queries and mutations
router.use('/condition', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = router;
