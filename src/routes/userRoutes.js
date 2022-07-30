const userRoutes = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/userControllers");

userRoutes.get("/", getUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.post("/", createUser);

module.exports = { userRoutes };
