const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist.model');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. перевірка blacklist
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: 'Token revoked' });
    }

    // 2. verify jwt
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
