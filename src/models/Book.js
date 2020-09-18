import mongoose from "mongoose";

export const Book = mongoose.model("Book", {
  name: String,
  authorId: mongoose.Types.ObjectId,
  pages: Number,
});
