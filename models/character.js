// Load required packages
var mongoose = require('mongoose');

// Define our starwars character schema
var CharacterSchema   = new mongoose.Schema({
  name: String,
  gender: String,
  height: Number,
  birthYear: Number,
  mass: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
