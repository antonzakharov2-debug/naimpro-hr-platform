const Candidate = require('../models/candidate.model');
const Vacancy = require('../models/vacancy.model');

// POST /api/candidates
const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, skills } = req.body;

    // validation
    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
      });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      skills,
      createdBy: req.user.userId, // з JWT
    });

    return res.status(201).json({
      message: 'Candidate created successfully',
      candidateId: candidate._id,
    });
  } catch (error) {
    console.error('Create candidate error:', error);
    return res.status(500).json({
      message: 'Failed to create candidate',
    });
  }
};

// GET /api/candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .sort({ createdAt: -1 });

    return res.status(200).json(candidates);
  } catch (error) {
    console.error('Get candidates error:', error);
    return res.status(500).json({
      message: 'Failed to load candidates',
    });
  }
};
/**
 * GET /api/candidates/:id
 */
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .populate('vacancies', 'title status');

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load candidate' });
  }
};

/**
 * PUT /api/candidates/:id
 */
const updateCandidate = async (req, res) => {
  try {
    const { name, email, phone, skills } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required',
      });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, skills },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({
      message: 'Candidate updated successfully',
      candidate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update candidate' });
  }
};

/**
 * DELETE /api/candidates/:id
 */
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({
      message: 'Candidate deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete candidate' });
  }
};

/**
 * POST /api/candidates/:id/assign-vacancy
 */
const assignVacancyToCandidate = async (req, res) => {
  try {
    const { vacancyId } = req.body;

    if (!vacancyId) {
      return res.status(400).json({
        message: 'Vacancy ID is required',
      });
    }

    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({
        message: 'Vacancy not found',
      });
    }

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({
        message: 'Candidate not found',
      });
    }

    if (candidate.vacancies.includes(vacancyId)) {
      return res.status(400).json({
        message: 'Candidate already assigned to this vacancy',
      });
    }

    candidate.vacancies.push(vacancyId);
    await candidate.save();

    res.status(200).json({
      message: 'Vacancy assigned to candidate',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to assign vacancy',
    });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  assignVacancyToCandidate,
};
