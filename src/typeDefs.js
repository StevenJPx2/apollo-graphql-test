import pkg from "apollo-server-express";
const { gql } = pkg;

export const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Book {
    id: ID!
    name: String!
    author: Author!
    pages: Int
  }

  type Query {
    book: Book
    books: [Book]
    author: Author
    authors: [Author]
  }

  type Mutation {
    createBook(name: String!, authorId: ID!, pages: Int): Book
    createAuthor(name: String!): Author
  }
`;
