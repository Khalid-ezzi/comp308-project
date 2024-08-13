const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const router = express.Router();

// Endpoint to handle alert-related GraphQL queries and mutations
router.use('/alert', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = router;
