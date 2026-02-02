const Vacancy = require('../models/vacancy.model');

const createVacancy = async (req, res) => {
  try {
    const { title, description, requirements } = req.body;

    // validation (FR-6, OR-1)
    if (!title || !description || !requirements) {
      return res.status(400).json({
        message: 'Title, description and requirements are required',
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: 'Title must be at least 3 characters long',
      });
    }

    const vacancy = await Vacancy.create({
      title,
      description,
      requirements,
      createdBy: req.user.userId, // з JWT
    });

    return res.status(201).json({
      message: 'Vacancy created successfully',
      vacancyId: vacancy._id,
    });
  } catch (error) {
    console.error('Create vacancy error:', error);
    return res.status(500).json({
      message: 'Failed to create vacancy',
    });
  }
};
const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'email role');

    return res.status(200).json(vacancies);
  } catch (error) {
    console.error('Get vacancies error:', error);
    return res.status(500).json({
      message: 'Failed to fetch vacancies',
    });
  }
};
const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, requirements } = req.body;

    // validation
    if (!title || !description || !requirements) {
      return res.status(400).json({
        message: 'Title, description and requirements are required',
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: 'Title must be at least 3 characters long',
      });
    }

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    vacancy.title = title;
    vacancy.description = description;
    vacancy.requirements = requirements;

    await vacancy.save();

    return res.status(200).json({
      message: 'Vacancy updated successfully',
    });
  } catch (error) {
    console.error('Update vacancy error:', error);
    return res.status(500).json({
      message: 'Failed to update vacancy',
    });
  }
};
const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    return res.status(200).json(vacancy);
  } catch (error) {
    console.error('Get vacancy by id error:', error);
    return res.status(500).json({
      message: 'Failed to load vacancy',
    });
  }
};
const hideVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findById(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    vacancy.status = 'Hidden';
    await vacancy.save();

    return res.status(200).json({
      message: 'Vacancy hidden successfully',
    });
  } catch (error) {
    console.error('Hide vacancy error:', error);
    return res.status(500).json({
      message: 'Failed to hide vacancy',
    });
  }
};
const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findByIdAndDelete(id);

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    return res.status(200).json({
      message: 'Vacancy deleted successfully',
    });
  } catch (error) {
    console.error('Delete vacancy error:', error);
    return res.status(500).json({
      message: 'Failed to delete vacancy',
    });
  }
};

module.exports = {
  createVacancy,
  getVacancies,
  updateVacancy,
  getVacancyById,
  hideVacancy,
  deleteVacancy,
};
