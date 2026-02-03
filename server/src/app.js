const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const passport = require('./config/passport');
const vacanciesRoutes = require('./routes/vacancies.routes');
const candidatesRoutes = require('./routes/candidates.routes');


const app = express();
app.use(passport.initialize());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://<твій-github-username>.github.io"
  ],
  credentials: true
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use('/api/auth', authRoutes);
app.use('/api/vacancies', vacanciesRoutes);
app.use('/api/candidates', candidatesRoutes);

module.exports = app;
