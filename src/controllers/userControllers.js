const bcrypt = require('bcrypt');
const { User } = require('../models/userModels');
const { jwtSign } = require('../utils/jwtSign');
const { OK, CREATED, SALT_ROUND } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user._id);
      res.status(OK).send({ token });
    })
    .catch(next);
};

exports.getCurrentUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('404: User Not Found');
    })
    .then((user) => {
      res.status(OK).send({ user });
    })
    .catch((err) => {
      // if (err.name === 'CastError') {
      //   return next(new NotFoundError('404: User Not Found'));
      // }
      next(err);
    });
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK).send({ users });
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
    res.status(OK).send({ user });
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
    res.status(CREATED).send({
      newUser: {
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('409: Conflict: Not Unique Email'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('400: Invalid Card Data'));
    }
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const { id } = req.user;
  try {
    const profile = await User.findByIdAndUpdate(
      id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(OK).send({ profile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('400: Invalid Card Data'));
    }
    next(err);
  }
};

exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const { id } = req.user;
  try {
    const profile = await User.findByIdAndUpdate(
      id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(OK).send({ profile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('400: Invalid Card Data'));
    }
    next(err);
  }
};
