const mongoose = require("mongoose");

//creating the new mongoose schema with fields email and likedMovies
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  likedMovies: Array,
});

//exporting the schema
module.exports = mongoose.model("users", userSchema);
