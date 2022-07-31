const { Card } = require("../models/cardModels");

exports.getCards = async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
};

exports.deleteCardById = async (req, res) => {
  const card = await Card.findByIdAndRemove(req.params.cardId);
  res.send(card);
};

exports.createCard = async (req, res) => {
  const card = await Card.create({ owner: req.user._id, ...req.body });
  res.send(card);
};
