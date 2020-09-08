const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const schema = require("./graphql");
const repositories = require("./database/repositories");
const passport = require("./utils/auth");

const options = {
  schema,
  context: ({ req, res }) => ({
    db: repositories,
    headers: req.headers,
  }),
  cors: false,
  debug: false,
};

if (process.env.ENV === "production") {
  options.playground = false;
  options.introspection = true;
  options.debug = false;
}

const server = new ApolloServer(options);

const app = express();
app.use(cors());
app.use(passport.authenticate("bearer", { session: false }));
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
