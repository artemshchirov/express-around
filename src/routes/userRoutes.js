const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', updateProfile);
userRoutes.patch('/me/avatar', updateAvatar);

module.exports = { userRoutes };
