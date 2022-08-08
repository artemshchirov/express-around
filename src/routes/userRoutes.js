const { celebrate, Joi } = require('celebrate');
const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);

userRoutes.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string()
        .trim(true)
        .alphanum()
        .length(24),
    }),
  }),
  getUserById
);

userRoutes.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .trim(true)
        .min(2)
        .max(30),
      about: Joi.string()
        .trim(true)
        .min(2)
        .max(30),
    }),
  }),
  updateProfile
);

userRoutes.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .trim(true)
        .uri(),
    }),
  }),
  updateAvatar
);

module.exports = { userRoutes };
