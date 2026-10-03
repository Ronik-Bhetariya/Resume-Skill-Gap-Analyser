const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendMobileOtp, verifyMobileOtp } = require('../services/otpService');

const JWT_SECRET = process.env.JWT_SECRET || 'resume_skill_gap_secret_key_2026_super_secure';

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @desc Direct User Registration (No OTP required)
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanMobile = (mobile || '').replace(/[\s-]/g, '');

    // Check if user already exists
    const query = [{ email: cleanEmail }];
    if (cleanMobile) {
      query.push({ mobile: cleanMobile });
    }

    const existingUser = await User.findOne({ $or: query });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email or mobile number already exists. Please login.'
      });
    }

    // Directly create new user in MongoDB
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      mobile: cleanMobile || 'N/A',
      password: password,
      isVerified: true,
      targetRole: 'Software Developer'
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        targetRole: user.targetRole,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

/**
 * @desc Step 2: Verify OTP and Create / Activate Account in MongoDB
 * @route POST /api/auth/verify-otp
 */
const verifyOtpAndRegister = async (req, res) => {
  try {
    const { name, email, mobile, password, otp } = req.body;

    if ((!mobile && !email) || !otp) {
      return res.status(400).json({ success: false, message: 'Contact information (mobile/email) and OTP are required' });
    }

    // Verify OTP in MongoDB
    const verification = await verifyMobileOtp({
      mobile,
      email,
      otp,
      purpose: 'registration'
    });

    if (!verification.success) {
      return res.status(400).json({ success: false, message: verification.message });
    }

    // Check if unverified user document exists or create a fresh one
    let user = await User.findOne({
      $or: [
        ...(email ? [{ email: email.toLowerCase() }] : []),
        ...(mobile ? [{ mobile: mobile.replace(/[\s-]/g, '') }] : [])
      ]
    });

    if (user) {
      user.name = name || user.name;
      user.email = email ? email.toLowerCase() : user.email;
      user.mobile = mobile ? mobile.replace(/[\s-]/g, '') : user.mobile;
      if (password) user.password = password;
      user.isVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name: name || 'User',
        email: (email || `user_${Date.now()}@example.com`).toLowerCase(),
        mobile: (mobile || '').replace(/[\s-]/g, ''),
        password: password || 'DefaultPass123!',
        isVerified: true,
        targetRole: 'Software Developer'
      });
    }

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account verified and created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        targetRole: user.targetRole,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during OTP verification' });
  }
};

/**
 * @desc Resend OTP for verification
 * @route POST /api/auth/resend-otp
 */
const resendOtp = async (req, res) => {
  try {
    const { mobile, email, purpose = 'registration' } = req.body;

    if (!mobile && !email) {
      return res.status(400).json({ success: false, message: 'Mobile number or email is required to resend OTP' });
    }

    await sendMobileOtp({ mobile, email, purpose });

    return res.status(200).json({
      success: true,
      message: 'A fresh OTP verification code has been dispatched!',
    });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return res.status(500).json({ success: false, message: 'Error resending OTP' });
  }
};

/**
 * @desc Login user with Email or Mobile + Password
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or mobile

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/mobile and password' });
    }

    const cleanIdentifier = identifier.trim();
    const user = await User.findOne({
      $or: [
        { email: cleanIdentifier.toLowerCase() },
        { mobile: cleanIdentifier.replace(/[\s-]/g, '') }
      ]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        targetRole: user.targetRole,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

/**
 * @desc Get current logged-in user profile
 * @route GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching user profile' });
  }
};

/**
 * @desc Update user profile
 * @route PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { name, targetRole, bio } = req.body;
    if (name) user.name = name;
    if (targetRole) user.targetRole = targetRole;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        targetRole: user.targetRole,
        bio: user.bio
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating profile' });
  }
};

module.exports = {
  register,
  verifyOtpAndRegister,
  resendOtp,
  login,
  getMe,
  updateProfile,
};
