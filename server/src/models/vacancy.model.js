const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    requirements: {
      type: String,
      required: true,
      minlength: 5,
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Hidden'],
      default: 'Active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vacancy', vacancySchema);
