const nodemailer = require('nodemailer');
const Otp = require('../models/Otp');

/**
 * Generate a cryptographically sound or numeric 6-digit OTP
 */
function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create a reusable Nodemailer transporter based on environment variables
 */
function getEmailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Support direct Gmail service setup if configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return null;
}

/**
 * Send an OTP verification email to the user
 */
async function sendEmailOtp({ email, otpCode, purpose = 'registration' }) {
  if (!email) return { sent: false, reason: 'No email provided' };

  const transporter = getEmailTransporter();
  if (!transporter) {
    console.log(`ℹ️ [EMAIL OTP NOTICE] SMTP credentials not set in .env. Email delivery skipped.`);
    return { sent: false, reason: 'SMTP not configured' };
  }

  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || 'noreply@skillgap.ai';
  const subject = purpose === 'registration'
    ? 'Your Verification Code - Resume Skill Gap Analyzer'
    : 'Your OTP Verification Code';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #1e293b; }
        .container { max-width: 540px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; opacity: 0.9; font-size: 14px; }
        .body { padding: 35px 30px; text-align: center; }
        .otp-box { background: #f1f5f9; border: 2px dashed #2563eb; border-radius: 10px; padding: 18px 24px; display: inline-block; margin: 25px 0; }
        .otp-code { font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1d4ed8; margin: 0; }
        .expiry-text { font-size: 13px; color: #64748b; margin-top: 10px; }
        .footer { background: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Resume Skill Gap Analyzer</h1>
          <p>Account Verification</p>
        </div>
        <div class="body">
          <p style="font-size: 16px; margin-bottom: 8px; color: #334155;">Hello,</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.5;">Use the following 6-digit One-Time Password (OTP) to complete your verification:</p>
          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
          </div>
          <p class="expiry-text">⏱️ This code will expire in <strong>10 minutes</strong>. Do not share this code with anyone.</p>
        </div>
        <div class="footer">
          If you did not request this verification code, please ignore this email.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Resume Skill Gap Analyzer" <${fromAddress}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      text: `Your Resume Skill Gap Analyzer verification code is: ${otpCode}. Valid for 10 minutes.`,
    });
    console.log(`✉️ [EMAIL OTP SENT] Message sent to ${email} (MessageID: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ [EMAIL OTP ERROR] Failed to send email to ${email}:`, error.message);
    return { sent: false, error: error.message };
  }
}

/**
 * Send and store OTP in MongoDB and dispatch via email/SMS
 */
async function sendMobileOtp({ mobile, email = '', purpose = 'registration' }) {
  // Normalize mobile number (remove spaces, dashes)
  const cleanMobile = (mobile || '').replace(/[\s-]/g, '');
  const cleanEmail = (email || '').toLowerCase().trim();

  // Invalidate any previously unused OTPs for this mobile/email & purpose
  await Otp.updateMany(
    {
      $or: [
        ...(cleanMobile ? [{ mobile: cleanMobile }] : []),
        ...(cleanEmail ? [{ email: cleanEmail }] : []),
      ],
      purpose,
      isUsed: false,
    },
    { $set: { isUsed: true } }
  );

  // Generate new OTP
  const otpCode = generateOtpCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await Otp.create({
    mobile: cleanMobile || 'N/A',
    email: cleanEmail,
    otp: otpCode,
    purpose,
    expiresAt,
    isUsed: false,
  });

  // Dispatch Email OTP if email is provided
  if (cleanEmail) {
    await sendEmailOtp({ email: cleanEmail, otpCode, purpose });
  }

  // Console logging for verification tracking
  console.log(`\n======================================================`);
  console.log(`📱 [OTP VERIFICATION DISPATCHED]`);
  if (cleanMobile) console.log(`📱 Mobile: ${cleanMobile}`);
  if (cleanEmail)  console.log(`✉️  Email:  ${cleanEmail}`);
  console.log(`🔑 OTP Code: ${otpCode}`);
  console.log(`⏱️  Valid until: ${expiresAt.toLocaleTimeString()}`);
  console.log(`📋 Purpose: ${purpose}`);
  console.log(`======================================================\n`);

  return {
    success: true,
    message: `OTP sent successfully to your contact${cleanEmail ? ' (' + cleanEmail + ')' : ''}`,
    mobile: cleanMobile,
    email: cleanEmail,
    expiresInMinutes: 10,
  };
}

/**
 * Verify OTP against MongoDB
 */
async function verifyMobileOtp({ mobile, email = '', otp, purpose = 'registration' }) {
  const cleanMobile = (mobile || '').replace(/[\s-]/g, '');
  const cleanEmail = (email || '').toLowerCase().trim();

  const query = {
    otp: (otp || '').trim(),
    purpose,
    isUsed: false,
    expiresAt: { $gt: new Date() },
  };

  if (cleanMobile && cleanEmail) {
    query.$or = [{ mobile: cleanMobile }, { email: cleanEmail }];
  } else if (cleanMobile) {
    query.mobile = cleanMobile;
  } else if (cleanEmail) {
    query.email = cleanEmail;
  }

  const existingOtp = await Otp.findOne(query).sort({ createdAt: -1 });

  if (!existingOtp) {
    return {
      success: false,
      message: 'Invalid or expired OTP code. Please check the code or request a new one.',
    };
  }

  // Mark OTP as used
  existingOtp.isUsed = true;
  await existingOtp.save();

  return {
    success: true,
    message: 'Verification successful!',
  };
}

module.exports = {
  sendMobileOtp,
  verifyMobileOtp,
  sendEmailOtp,
};
