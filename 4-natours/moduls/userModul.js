const mongoose = require('mongoose');
const validator = require('validator');
// const { validate } = require('./tourModul');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' A user must have a name']
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    message: 'Please provide a valid email',
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    message: 'Passwords do not match!'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
