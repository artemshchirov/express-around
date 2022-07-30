const userRoutes = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
} = require("../controllers/userControllers");

userRoutes.get("/", getUsers);
userRoutes.get("/:userId", getUser);
userRoutes.post("/", createUser);

module.exports = { userRoutes };
