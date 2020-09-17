import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

const app = express();

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(5000, () => console.log("Server ready at localhost:5000/graphql"));
