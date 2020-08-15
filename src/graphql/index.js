const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typesArray = loadFilesSync(path.join(__dirname, "/**/*.graphql"));
const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/*.resolvers.*")
);
module.exports = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
});
