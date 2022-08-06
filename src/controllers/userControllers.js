const bcrypt = require('bcrypt');
const { User } = require('../models/userModels');
const { showErrorMessage } = require('../utils/showErrorMessage');
const { OK, CREATED, SALT_ROUND } = require('../utils/constants');
const { jwtSign } = require('../utils/jwtSign');
const { jwtVerify } = require('../utils/jwtVerify');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .orFail()
    .then((user) => bcrypt.compare(password, user.password).then(() => {
      const token = jwtSign(user._id);
      res.status(OK).send({ data: token });
    }))
    .catch((err) => {
      showErrorMessage(err, req, res);
    });
};

exports.getUsers = async (req, res) => {
  try {
    const ifVerified = jwtVerify(req.headers.authorization);
    console.log(
      'req.headers.authorization: ',
      req.headers.authorization,
      'ifVerified: ',
      ifVerified
    );
    const users = await User.find({});
    res.status(OK).send({ data: users });
  } catch (err) {
    showErrorMessage(err, req, res);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail();
    res.status(OK).send({ data: user });
  } catch (err) {
    showErrorMessage(err, req, res);
  }
};

exports.createUser = async (req, res) => {
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
    showErrorMessage(err, req, res);
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
    showErrorMessage(err, req, res);
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
    showErrorMessage(err, req, res);
  }
};
