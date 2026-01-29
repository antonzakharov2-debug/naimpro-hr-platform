const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const passport = require('./config/passport');

const app = express();
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use('/api/auth', authRoutes);

module.exports = app;
