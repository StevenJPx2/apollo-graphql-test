import mongoose from "mongoose";

export const Author = mongoose.model("Author", {
  name: String,
  books: [mongoose.Types.ObjectId],
});
