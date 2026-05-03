const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const signToken = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: '24h' });

const verifyToken = (token) =>
  jwt.verify(token, SECRET);

module.exports = { signToken, verifyToken };
