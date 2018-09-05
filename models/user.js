const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
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

userSchema.pre('validate', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
