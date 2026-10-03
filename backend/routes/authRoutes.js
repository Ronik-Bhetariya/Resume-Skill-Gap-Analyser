const express = require('express');
const router = express.Router();
const {
  register,
  verifyOtpAndRegister,
  resendOtp,
  login,
  getMe,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public auth endpoints
router.post('/register', register);
router.post('/verify-otp', verifyOtpAndRegister);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

// Protected user profile endpoints
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
