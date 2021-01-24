const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    select: false, //cuando se hace GET, no trae la contraseña por seguridad.
    required: true
  },

  is_super_admin: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    enum: ['instructor', 'student', 'guest', 'banned'],
    default: 'guest'
  },

  avatar: String
});

userSchema.methods.encryptPassword = (password)=> {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password){
  bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
