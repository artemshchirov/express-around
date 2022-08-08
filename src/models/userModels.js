const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

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
      message: 'Avatar link must be an URL',
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
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
  next
) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('401 Invalid Email or Password');
    })
    .then((user) => bcrypt
      .compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('401 Invalid Email or Password');
        }

        return user;
      })
      .catch(next));
};

exports.User = mongoose.model('user', userSchema);
