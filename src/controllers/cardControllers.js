const { Card } = require('../models/cardModels');
const { OK, CREATED } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch (err) {
    next(err);
  }
};

exports.deleteCardById = async (req, res, next) => {
  const { cardId } = req.params;
  console.log('cardId: ', cardId);

  try {
    const card = await Card.findByIdAndRemove(cardId).orFail(() => {
      throw new ValidationError('400: Card Not Found');
    });
    res.status(OK).send({ data: card });
  } catch (err) {
    next(err);
  }
};

exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const { id } = req.user;
  try {
    const newCard = await Card.create({
      name,
      link,
      owner: id,
    });
    newCard.populate('owner');
    res.status(CREATED).send(newCard);
  } catch (err) {
    next(err);
  }
};

exports.likeCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { id } = req.user;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: id } },
      { new: true }
    ).orFail(() => {
      throw new NotFoundError('404: Card Not Found');
    });
    res.status(OK).send({ data: card });
  } catch (err) {
    next(err);
  }
};

exports.dislikeCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { id } = req.user;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: id } },
      { new: true }
    ).orFail(() => {
      throw new NotFoundError('404: Card Not Found');
    });
    res.status(OK).send({ data: card });
  } catch (err) {
    next(err);
  }
};
