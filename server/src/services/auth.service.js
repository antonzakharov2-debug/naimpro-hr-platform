const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

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

module.exports = {
  registerUser,
};
