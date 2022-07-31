const { User } = require("../models/userModels");

const OK = 200;
const { errorMessage } = require("../utils/errorMessage");

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send(user);
};

exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({
      name,
      about,
      avatar,
      new: true,
      runValidators: true,
    });

    res.send({ data: newUser });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Некорректные данные" });
    }
    return res.status(500).send({ message: "Произошла ошибка" });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  const profile = await User.findByIdAndUpdate(req.user._id, {
    name,
    about,
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((updatedProfile) => res.send({ data: updatedProfile }))
    .catch((err) => {
      res.send({
        message:
          "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое",
      });
    });
  res.send(profile);
};

exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const profile = await User.findByIdAndUpdate(req.user._id, {
    avatar,
    new: true,
    runValidators: true,
    upsert: true,
  });
  res.send(profile);
};
