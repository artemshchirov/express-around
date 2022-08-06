const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Frodo Baggins',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'middle-earth explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator(text) {
        return validator.isURL(text);
      },
      message: 'Avatar link must start with https://',
    },
    default:
      'https://github.com/artemshchirov/mesto/blob/main/src/images/frodo.jpg',
  },
  email: {
    type: String,
    minlength: 2,
    required: true,
    unique: true,
    validate: {
      validator(text) {
        return validator.isEmail(text);
      },
      message: 'Invalid Email Format',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

exports.User = mongoose.model('user', userSchema);
