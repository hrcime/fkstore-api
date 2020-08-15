const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const schema = require("./graphql");
const db = require("./models");
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    db: db.sequelize.models,
  }),
  // playground: {
  //   endpoint: "/dev/graphql"
  // },
  cors: false,
});
const app = express();
app.use(cors());
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
