const { Card } = require("../models/cardModels");
const { errorMessage } = require("../utils/errorMessage");
const { OK, CREATED } = require("../utils/constants");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    res.status(OK).send({ data: card });
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  try {
    const newCard = await Card.create({
      name,
      link,
      owner: _id,
    });
    newCard.populate("owner");
    res.status(CREATED).send(newCard);
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.likeCard = async (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } },
      { new: true }
    );
    res.status(OK).send({ data: card });
  } catch (err) {
    errorMessage(err, req, res);
  }
};

exports.dislikeCard = async (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } },
      { new: true }
    );
    res.status(OK).send({ data: card });
  } catch (err) {
    errorMessage(err, req, res);
  }
};
