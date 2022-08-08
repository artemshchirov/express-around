const bcrypt = require('bcrypt');
const { User } = require('../models/userModels');
const { jwtSign } = require('../utils/jwtSign');
const { OK, CREATED, SALT_ROUND } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user._id);
      res.status(OK).send({ data: token });
    })
    .catch(next);
};

exports.getCurrentUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .orFail()
    .then((user) => {
      res.status(OK).send({ data: user });
    })
    .catch(next);
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK).send({ data: users });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail(() => {
      throw new NotFoundError('404: User Not Found');
    });
    res.status(OK).send({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, SALT_ROUND);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });
    res.status(CREATED).send({ data: newUser });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
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
    next(err);
  }
};

exports.updateAvatar = async (req, res, next) => {
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
    next(err);
  }
};
