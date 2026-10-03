const mongoose = require('mongoose');

const jobRoleSchema = new mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Engineering',
    },
    icon: {
      type: String,
      default: 'Code',
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: [
      {
        type: String,
        required: true,
      },
    ],
    desirableSkills: [
      {
        type: String,
      },
    ],
    softSkills: [
      {
        type: String,
      },
    ],
    tools: [
      {
        type: String,
      },
    ],
    salaryRange: {
      type: String,
      default: '₹4,00,000 - ₹12,00,000 / yr (4 - 12 LPA)',
    },
    experienceLevel: {
      type: String,
      default: '0 - 3 Years',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('JobRole', jobRoleSchema);
