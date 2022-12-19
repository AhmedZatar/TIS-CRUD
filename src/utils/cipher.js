const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { hashSalt, secretKey } = require('../config/config');

const hash = (password) => crypto.scryptSync(password, hashSalt, 32).toString('hex');

const getJwtToken = (data) =>
  jwt.sign(data, secretKey);

module.exports = {
  hash,
  getJwtToken,
};
