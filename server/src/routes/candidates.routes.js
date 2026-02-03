const express = require('express');
const authenticate = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  assignVacancyToCandidate,
} = require('../controllers/candidates.controller');

const router = express.Router();

// POST /api/candidates
router.post(
  '/',
  authenticate,
  requireRole('HR'),
  createCandidate
);

// GET /api/candidates
router.get(
  '/',
  authenticate,
  requireRole('HR'),
  getCandidates
);
// GET ONE
router.get('/:id', authenticate, requireRole('HR'), getCandidateById);

// UPDATE
router.put('/:id', authenticate, requireRole('HR'), updateCandidate);

// DELETE
router.delete('/:id', authenticate, requireRole('HR'), deleteCandidate);

// ASSIGN VACANCY
router.post(
  '/:id/assign-vacancy',
  authenticate,
  requireRole('HR'),
  assignVacancyToCandidate
);
module.exports = router;
