const Otp = require('../models/Otp');

/**
 * Generate a 6-digit numeric OTP code
 */
function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send and store OTP in MongoDB
 */
async function sendMobileOtp({ mobile, email = '', purpose = 'registration' }) {
  // Normalize mobile number (remove spaces, dashes)
  const cleanMobile = mobile.replace(/[\s-]/g, '');
  
  // Invalidate any previously unused OTPs for this mobile & purpose
  await Otp.updateMany(
    { mobile: cleanMobile, purpose, isUsed: false },
    { $set: { isUsed: true } }
  );

  // Generate new OTP
  const otpCode = generateOtpCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  const newOtp = await Otp.create({
    mobile: cleanMobile,
    email,
    otp: otpCode,
    purpose,
    expiresAt,
    isUsed: false,
  });

  // Log OTP for easy developer / user access
  console.log(`\n======================================================`);
  console.log(`📱 [MOBILE OTP VERIFICATION]`);
  console.log(`📱 Mobile: ${cleanMobile}`);
  console.log(`🔑 OTP Code: ${otpCode}`);
  console.log(`⏱️  Valid until: ${expiresAt.toLocaleTimeString()}`);
  console.log(`📋 Purpose: ${purpose}`);
  console.log(`======================================================\n`);

  return {
    success: true,
    message: `OTP sent successfully to ${cleanMobile}`,
    mobile: cleanMobile,
    expiresInMinutes: 10,
    // Provide demoOtp in dev response for effortless testing
    demoOtp: otpCode,
  };
}

/**
 * Verify OTP against MongoDB
 */
async function verifyMobileOtp({ mobile, otp, purpose = 'registration' }) {
  const cleanMobile = mobile.replace(/[\s-]/g, '');

  const existingOtp = await Otp.findOne({
    mobile: cleanMobile,
    otp: otp.trim(),
    purpose,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!existingOtp) {
    return {
      success: false,
      message: 'Invalid or expired OTP. Please request a new one.',
    };
  }

  // Mark OTP as used
  existingOtp.isUsed = true;
  await existingOtp.save();

  return {
    success: true,
    message: 'Mobile number verified successfully!',
  };
}

module.exports = {
  sendMobileOtp,
  verifyMobileOtp,
};
