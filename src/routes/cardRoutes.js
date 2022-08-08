const { celebrate, Joi } = require('celebrate');
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

cardRoutes.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().trim(true).alphanum().length(24),
    }),
  }),
  validateCardOwner,
  deleteCardById
);

cardRoutes.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim(true).required().min(2).max(30),
      link: Joi.string().trim(true).uri().required(),
    }),
  }),
  createCard
);

cardRoutes.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().trim(true).alphanum().length(24),
    }),
  }),
  likeCard
);

cardRoutes.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().trim(true).alphanum().length(24),
    }),
  }),
  dislikeCard
);

module.exports = { cardRoutes };
