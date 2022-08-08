const { Card } = require('../models/cardModels');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// eslint-disable-next-line consistent-return
exports.validateCardOwner = async (req, res, next) => {
  const { id } = req.user;
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('404 Card Not Found');
    });
    if (id !== card.owner.toString()) {
      throw new ForbiddenError('403 Authorized But Forbidden');
    }
  } catch (err) {
    return next(err);
  }
  next();
};
