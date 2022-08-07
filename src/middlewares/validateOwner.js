const { Card } = require('../models/cardModels');
const { showErrorMessage } = require('../utils/showErrorMessage');
const { AUTHORIZED_BUT_FORBIDDEN } = require('../utils/constants');

exports.validateOwner = async (req, res, next) => {
  const { id } = req.user;
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId).orFail();
    if (id !== card.owner.toString()) {
      const e = new Error(AUTHORIZED_BUT_FORBIDDEN);
      e.name = 'Forbidden';
      throw e;
    }
  } catch (err) {
    return showErrorMessage(err, req, res);
  }
  next();
};
