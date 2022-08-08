const { Card } = require('../models/cardModels');
const ForbiddenError = require('../errors/ForbiddenError');

exports.validateCardOwner = async (req, res, next) => {
  const { id } = req.user;
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId).orFail();
    if (id !== card.owner.toString()) {
      throw new ForbiddenError('403 Authorized But Forbidden');
    }
  } catch (err) {
    next(err);
  }
  next();
};
