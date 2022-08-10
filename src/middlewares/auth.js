const { jwtVerify } = require('../utils/jwtVerify');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('401 Unauthorized'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwtVerify(token);
  } catch (err) {
    next(err);
  }

  req.user = payload;
  req.user.id = '';

  next();
};
