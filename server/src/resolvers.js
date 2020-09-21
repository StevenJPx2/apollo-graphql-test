import pkg from "apollo-server-express";
const { UserInputError } = pkg;
import { Book } from "./models/Book.js";
import { Author } from "./models/Author.js";

export const resolvers = {
  Author: {
    books: async (author) => await Book.find({ authorId: author.id }),
  },

  Book: {
    author: async (book) =>
      await Author.findOne({
        books: book.id,
      }),
  },

  Query: {
    book: (_, { id }) => Book.findById(id),
    books: () => Book.find(),
    author: (_, { id }) => Author.findById(id),
    authors: () => Author.find(),
  },

  Mutation: {
    createBook: async (_, { name, authorId, pages }) => {
      if (!Author.exists({ id: authorId })) {
        throw new UserInputError("AuthorId not found");
      }
      const book = new Book({ name, authorId, pages });
      await Author.findByIdAndUpdate(
        authorId,
        { $push: { books: book.id } },
        (err, doc) => {
          console.log(`📄 ${err || doc}`);
        }
      );
      await book.save();
      return book;
    },

    createAuthor: async (_, { name }) => {
      const author = new Author({ name });
      await author.save();
      return author;
    },

    deleteAllBooks: async () => {
      try {
        await Book.deleteMany({});
        await Author.updateMany({}, { $pullAll: {} });
      } catch (e) {
        return "🚫 Clear not successful";
      }
      return "✅ Clear successful";
    },

    deleteAuthor: async (_, { id }) => {
      if (!Author.exists({ id: id })) {
        throw new UserInputError("🚫 Author ID not found/incorrect...");
      }
      await Book.deleteMany({ authorId: id });
      return await Author.findByIdAndRemove(id);
    },

    deleteBook: async (_, { id }) => {
      if (!Book.exists({ id: id })) {
        throw new UserInputError("🚫 Book ID not found/incorrect...");
      }

      return await Book.findByIdAndRemove(id);
    },

    truncate: async () => {
      await Book.deleteMany({});
      await Author.deleteMany({});
    },
  },
};
