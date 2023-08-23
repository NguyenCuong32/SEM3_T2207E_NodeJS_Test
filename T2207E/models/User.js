const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  address: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;