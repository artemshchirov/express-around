const { jwtVerify } = require('../utils/jwtVerify');
const { UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).send({ message: '401 Unauthorized 1' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwtVerify(token);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: '401 Unauthorized 2' });
  }

  req.user = payload;

  next();
};
