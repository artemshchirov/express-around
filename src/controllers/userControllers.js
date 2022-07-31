const { User } = require("../models/userModels");
const { errorMessage } = require("../utils/errorMessage");
const { OK, CREATED } = require("../utils/constants");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(OK).send(users);
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail();
    res.status(OK).send(user);
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({
      name,
      about,
      avatar,
    });
    res.status(CREATED).send(newUser);
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  try {
    const profile = await User.findByIdAndUpdate(
      _id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(OK).send({ data: profile });
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  try {
    const profile = await User.findByIdAndUpdate(
      _id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(OK).send({ data: profile });
  } catch (err) {
    errorMessage(err, req, res);
  }
};
