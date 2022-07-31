const { User } = require("../models/userModels");

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send(user);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
};
