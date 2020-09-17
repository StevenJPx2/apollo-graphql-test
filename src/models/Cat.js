const mongoose = require("mongoose");

export const Cat = mongoose.model("Cat", { name: String });
