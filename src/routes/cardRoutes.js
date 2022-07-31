const cardRoutes = require("express").Router();

const {
  getCards,
  deleteCardById,
  createCard,
} = require("../controllers/cardControllers");

cardRoutes.get("/", getCards);
cardRoutes.delete("/:cardId", deleteCardById);
cardRoutes.post("/", createCard);

module.exports = { cardRoutes };
