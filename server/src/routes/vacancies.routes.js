const express = require('express');
const authenticate = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const {
  createVacancy,
  getVacancies,
  updateVacancy,
  getVacancyById,
  hideVacancy,
  deleteVacancy,
} = require('../controllers/vacancies.controller');

const router = express.Router();

// POST /api/vacancies
router.post('/', authenticate, requireRole('HR'), createVacancy);

// GET /api/vacancies
router.get('/', authenticate, requireRole('HR'), getVacancies);
// PUT /api/vacancies/:id
router.put(
  '/:id',
  authenticate,
  requireRole('HR'),
  updateVacancy
);
router.get(
  '/:id',
  authenticate,
  requireRole('HR'),
  getVacancyById
);
// hide vacancy
router.patch(
  '/:id/hide',
  authenticate,
  requireRole('HR'),
  hideVacancy
);

// delete vacancy
router.delete(
  '/:id',
  authenticate,
  requireRole('HR'),
  deleteVacancy
);

module.exports = router;
