import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegisterView({ onLoginClick, onRegisterSuccess }) {
  const { initiateRegister, verifyOtpAndRegister, resendOtp, showToast } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [demoOtpCode, setDemoOtpCode] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const otpInputsRef = useRef([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Submit form & trigger Mobile OTP
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await initiateRegister(formData);
      if (res && res.data) {
        setDemoOtpCode(res.data.demoOtp || '123456');
        setShowOtpModal(true);
        setTimer(120);
        setCanResend(false);
        // Focus first OTP input box after modal opens
        setTimeout(() => {
          if (otpInputsRef.current[0]) {
            otpInputsRef.current[0].focus();
          }
        }, 100);
      }
    } catch (err) {
      // Toast already handled in context
    } finally {
      setLoading(false);
    }
  };

  // Handle individual OTP digit input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance to next box
    if (value && index < 5 && otpInputsRef.current[index + 1]) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Backspace auto-retreat
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleQuickFillDemoOtp = () => {
    if (demoOtpCode) {
      const digits = demoOtpCode.split('').slice(0, 6);
      while (digits.length < 6) digits.push('0');
      setOtpDigits(digits);
      showToast('Demo OTP auto-filled!', 'info');
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      showToast('Please enter the full 6-digit OTP', 'error');
      return;
    }

    setVerifying(true);
    try {
      await verifyOtpAndRegister({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        otp: fullOtp,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}

      setShowOtpModal(false);
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      // Toast already shown
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      const res = await resendOtp(formData.mobile);
      if (res) {
        setDemoOtpCode(res.demoOtp || '123456');
        setTimer(120);
        setCanResend(false);
        setOtpDigits(['', '', '', '', '', '']);
      }
    } catch (err) {}
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Header matching prototype screen 2 */}
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us to analyze your resume and improve your skills</p>
        </div>

        <form onSubmit={handleSubmitForm}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Mobile Number for OTP Verification */}
          <div className="form-group">
            <label className="form-label">
              Mobile Number <span style={{ color: '#2563eb', fontSize: '0.8rem' }}>(OTP Verification)</span>
            </label>
            <div className="input-with-icon">
              <Phone size={18} className="input-icon" />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your 10-digit mobile number"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="form-input"
                required
              />
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label">Confirm Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="form-input"
                required
              />
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {loading ? 'Sending OTP to Mobile...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
          Already have an account?{' '}
          <span
            onClick={onLoginClick}
            style={{ color: '#2563eb', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login
          </span>
        </div>
      </div>

      {/* =========================================================
          Mobile OTP Verification Modal
          ========================================================= */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '440px', textAlign: 'center' }}>
            {/* Phone badge icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.2)',
              }}
            >
              <Phone size={30} />
            </div>

            <h3 style={{ fontSize: '1.45rem', color: '#0f172a', marginBottom: '0.4rem' }}>
              Verify Mobile Number
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              We have sent a 6-digit verification OTP code to
            </p>
            <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
              +91 {formData.mobile}
            </div>

            {/* Quick Fill Demo Chip */}
            {demoOtpCode && (
              <div
                onClick={handleQuickFillDemoOtp}
                style={{
                  background: '#f0fdf4',
                  border: '1px dashed #86efac',
                  color: '#166534',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                }}
                title="Click to auto-fill demo OTP"
              >
                <CheckCircle2 size={15} color="#16a34a" />
                <span>Demo OTP: <b>{demoOtpCode}</b> (Click to fill)</span>
              </div>
            )}

            {/* 6 Digit Input Boxes */}
            <div className="otp-inputs-grid">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpInputsRef.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="otp-box"
                />
              ))}
            </div>

            {/* Timer & Resend */}
            <div style={{ margin: '1.25rem 0', fontSize: '0.9rem', color: '#64748b' }}>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  style={{
                    background: 'none',
                    color: '#2563eb',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <RotateCw size={15} />
                  <span>Resend OTP Code</span>
                </button>
              ) : (
                <span>
                  Resend code in <strong style={{ color: '#1e293b' }}>{formatTimer(timer)}</strong>
                </span>
              )}
            </div>

            {/* Verify CTA */}
            <button
              onClick={handleVerifyOtp}
              disabled={verifying}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {verifying ? 'Verifying OTP & Registering...' : 'Verify & Complete Registration'}
            </button>

            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '0.75rem', padding: '0.65rem' }}
            >
              Change Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
