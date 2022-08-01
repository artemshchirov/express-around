const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateProfile);
userRoutes.patch('/me/avatar', updateAvatar);

module.exports = { userRoutes };
