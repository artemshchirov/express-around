const { jwtVerify } = require('../utils/jwtVerify');
const { showErrorMessage } = require('../utils/showErrorMessage');
const { OK, CREATED, UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log('authorization: ', authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('err1: ');

    return res.status(UNAUTHORIZED).send({ message: '401 Unauthorized 1' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log('token: ', token);

  let payload;

  try {
    payload = jwtVerify(token);
    console.log('payload: ', payload);
  } catch (err) {
    // отправим ошибку, если не получилось
    return res.status(UNAUTHORIZED).send({ message: '401 Unauthorized 2' });
  }

  req.user = payload;

  console.log('req.user: ', req.user);

  next();
};
