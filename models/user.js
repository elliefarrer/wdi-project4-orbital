const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  dateOfBirth: Date,
  postcode: String,
  gender: String,
  sexuality: String,
  minAgeRange: Number,
  maxAgeRange: Number,
  profilePic: String,
  occupation: String,
  languages: [{ type: String }],
  bio: String
});

module.exports = mongoose.model('User', userSchema);
