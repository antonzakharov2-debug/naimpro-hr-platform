const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register,login,logout } = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);

// старт Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// callback від Google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // редіректимо на фронт з токеном
    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
  }
);


module.exports = router;
