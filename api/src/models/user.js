const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  progress: {
    type: Array
  },

  admin: {
    type: Boolean
  },

  sAdmin: {
    type: Boolean
  }
});

module.exports = mongoose.model('User', userSchema);