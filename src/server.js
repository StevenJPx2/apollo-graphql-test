import express from "express";
import apolloPkg from "apollo-server-express";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import mongoPkg from "mongoose";

const { connect } = mongoPkg;
const { ApolloServer } = apolloPkg;

connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
