const routes = require("express").Router();
const { userRoutes } = require("./userRoutes");

routes.use("/users", userRoutes);

module.exports = { routes };
