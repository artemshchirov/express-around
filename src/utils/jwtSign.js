const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.jwtSign = (id) => {
  jwt.sign({ id }, JWT_SECRET);
};
