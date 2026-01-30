const { registerUser,loginUser } = require('../services/auth.service');
const { logoutUser } = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }

    const user = await registerUser(email, password);

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: 'Registration failed' });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const token = await loginUser(email, password);

    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({
      message: 'Invalid email or password',
    });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.token;

    await logoutUser(token);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed' });
  }
};
module.exports = {
  register,
  login,
  logout,
};
