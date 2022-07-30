const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      minlength: 2,
      maxlength: 30,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Card = mongoose.model("card", cardSchema);
