const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.jwtVerify = (token) => jwt.verify(token, JWT_SECRET);
