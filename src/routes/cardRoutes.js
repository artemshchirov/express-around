const cardRoutes = require('express').Router();

const { validateCardOwner } = require('../middlewares/validateCardOwner');

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', validateCardOwner, deleteCardById);
cardRoutes.post('/', createCard);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRoutes };
