const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const router = express.Router();

// Endpoint to handle daily log-related GraphQL queries and mutations
router.use('/dailylog', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = router;
