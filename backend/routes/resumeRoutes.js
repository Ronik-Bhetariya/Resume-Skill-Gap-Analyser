const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { optionalAuth, protect } = require('../middleware/authMiddleware');
const {
  uploadResume,
  analyzeResume,
  getReports,
  getReportById,
  deleteReport,
  getSampleResumes,
} = require('../controllers/resumeController');

// Upload & extract skills
router.post('/upload', upload.single('resume'), uploadResume);

// Analyze skill gap & save to MongoDB
router.post('/analyze', optionalAuth, analyzeResume);

// Report history & management
router.get('/reports', optionalAuth, getReports);
router.get('/reports/:id', getReportById);
router.delete('/reports/:id', optionalAuth, deleteReport);

// Samples
router.get('/samples', getSampleResumes);

module.exports = router;
