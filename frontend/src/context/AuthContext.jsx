import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [dbStatus, setDbStatus] = useState({ connected: false, loading: true });
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Check MongoDB health on mount
  const checkDbHealth = async () => {
    try {
      const res = await axios.get('/api/health');
      if (res.data?.database?.status === 'connected') {
        setDbStatus({ connected: true, dbName: res.data.database.dbName, loading: false });
      } else {
        setDbStatus({ connected: false, loading: false });
      }
    } catch (err) {
      setDbStatus({ connected: false, loading: false });
    }
  };

  useEffect(() => {
    checkDbHealth();
    const interval = setInterval(checkDbHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch current user if token exists
  useEffect(() => {
    if (token) {
      axios
        .get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          // If token expired
          setUser(null);
          setToken('');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        });
    }
  }, [token]);

  // Initiate Registration & Send Mobile OTP
  const initiateRegister = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      if (res.data.success) {
        showToast(res.data.message, 'success');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      showToast(msg, 'error');
      throw new Error(msg);
    }
  };

  // Step 2: Verify Mobile OTP and Complete Registration
  const verifyOtpAndRegister = async (payload) => {
    try {
      const res = await axios.post('/api/auth/verify-otp', payload);
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        showToast('Registration complete! Welcome to Resume Skill Gap Analyzer.', 'success');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'OTP verification failed';
      showToast(msg, 'error');
      throw new Error(msg);
    }
  };

  // Resend OTP
  const resendOtp = async (mobile, email = '', purpose = 'registration') => {
    try {
      const res = await axios.post('/api/auth/resend-otp', { mobile, email, purpose });
      if (res.data.success) {
        showToast(res.data.message || 'New OTP sent to your email & mobile.', 'info');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to resend OTP';
      showToast(msg, 'error');
      throw new Error(msg);
    }
  };

  // Login
  const login = async (identifier, password) => {
    try {
      const res = await axios.post('/api/auth/login', { identifier, password });
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        showToast(`Welcome back, ${res.data.user.name}!`, 'success');
        return res.data;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid credentials';
      showToast(msg, 'error');
      throw new Error(msg);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        dbStatus,
        initiateRegister,
        verifyOtpAndRegister,
        resendOtp,
        login,
        logout,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Render */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type === 'error' ? 'toast-error' : 'toast-success'}`}>
            <span style={{ fontSize: '1.2rem' }}>
              {t.type === 'error' ? '⚠️' : t.type === 'success' ? '✅' : 'ℹ️'}
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t.message}</span>
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
