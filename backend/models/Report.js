const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // can be generated for anonymous/guest or authenticated users
    },
    candidateInfo: {
      name: { type: String, default: 'Candidate' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      experience: { type: String, default: 'Fresher / Entry Level' },
      education: { type: String, default: 'B.E. Information Technology' },
    },
    resumeFileName: {
      type: String,
      default: 'Uploaded_Resume.pdf',
    },
    resumeFileSize: {
      type: String,
      default: '1.2 MB',
    },
    targetRole: {
      roleId: { type: String, required: true },
      title: { type: String, required: true },
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    summaryStats: {
      matchedCount: { type: Number, default: 0 },
      missingCount: { type: Number, default: 0 },
      partialCount: { type: Number, default: 0 },
      totalRequired: { type: Number, default: 0 },
    },
    extractedSkills: {
      technical: [{ type: String }],
      soft: [{ type: String }],
      tools: [{ type: String }],
      cloudAndDb: [{ type: String }],
    },
    skillComparison: [
      {
        skillName: { type: String, required: true },
        status: { type: String, enum: ['matched', 'missing', 'partial'], required: true },
        userHas: { type: Boolean, default: false },
        isRequired: { type: Boolean, default: true },
        category: { type: String, default: 'Technical' },
      },
    ],
    recommendations: [
      {
        skill: { type: String, required: true },
        icon: { type: String, default: 'code' },
        description: { type: String, required: true },
        difficulty: { type: String, default: 'Intermediate' },
        estimatedTime: { type: String, default: '2-3 Weeks' },
        resources: [
          {
            title: { type: String },
            type: { type: String, enum: ['course', 'documentation', 'video', 'practice'] },
            url: { type: String },
          },
        ],
        actionSteps: [{ type: String }],
      },
    ],
    roadmap: [
      {
        week: { type: String },
        focus: { type: String },
        tasks: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Report', reportSchema);
