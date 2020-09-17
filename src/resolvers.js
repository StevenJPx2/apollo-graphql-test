import { Book } from "./models/Book.js";
import { Author } from "./models/Author.js";

export const resolvers = {
  Query: {
    book: (_, { id }) => Book.findById(id),
    books: () => Book.find(),
  },

  Mutation: {
    createBook: async (_, { name, authorId, pages }) => {
      const book = new Book({ name, authorId, pages });
      await book.save();
      return book;
    },

    createAuthor: async (_, { name }) => {
      const author = new Author({ name });
      await author.save();
      return author;
    },
  },
};

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
