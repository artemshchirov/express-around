const jwt = require('jsonwebtoken');

const { NODE_ENV, REACT_APP_JWT_SECRET } = process.env;

exports.jwtSign = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? REACT_APP_JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' }
);
