const { User } = require("../models/userModels");

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

exports.getUser = (req, res) => {
  res.send("test getUser");
  // res.send(users.find(({ id }) => id === req.params.id));
};

exports.createUser = (req, res) => {
  res.send({
    name: "name",
    about: "about",
    avatar: "avatar",
  });
};
