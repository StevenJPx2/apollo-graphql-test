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
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    createBook(name: String!, authorId: ID!, pages: Int): Book
    createAuthor(name: String!): Author
    deleteAllBooks: String
    deleteAuthor(id: ID!): Author
    deleteBook(id: ID!): Book
    truncate: String
  }
`;
