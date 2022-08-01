const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return text.indexOf('https://') === 0;
      },
      message: 'avatar link must start with https://',
    },
  },
});

exports.User = mongoose.model('user', userSchema);
