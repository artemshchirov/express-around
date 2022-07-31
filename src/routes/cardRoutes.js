const cardRoutes = require("express").Router();

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardControllers");

cardRoutes.get("/", getCards);
cardRoutes.delete("/:cardId", deleteCardById);
cardRoutes.post("/", createCard);
cardRoutes.put("/:cardId/likes", likeCard);
cardRoutes.delete("/:cardId/likes", dislikeCard);

module.exports = { cardRoutes };
