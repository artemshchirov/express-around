const cardRoutes = require('express').Router();

const { validateOwner } = require('../middlewares/validateOwner');

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', validateOwner, deleteCardById);
cardRoutes.post('/', createCard);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRoutes };
