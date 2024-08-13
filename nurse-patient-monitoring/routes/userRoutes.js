const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const router = express.Router();

// Endpoint to handle user-related GraphQL queries and mutations
router.use('/user', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = router;
