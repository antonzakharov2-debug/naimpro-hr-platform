const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const TokenBlacklist = require('../models/tokenBlacklist.model');

const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
    role: 'HR',
  });

  return user;
};
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return token;
};
const logoutUser = async (token) => {
  const decoded = jwt.decode(token);

  if (!decoded || !decoded.exp) {
    throw new Error('Invalid token');
  }

  await TokenBlacklist.create({
    token,
    expiresAt: new Date(decoded.exp * 1000),
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
