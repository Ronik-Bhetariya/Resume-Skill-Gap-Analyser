import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FileSearch, Database, CheckCircle2, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  const { user, logout, dbStatus } = useAuth();

  return (
    <nav className="main-navbar">
      {/* Brand Logo */}
      <div
        className="nav-brand"
        style={{ cursor: 'pointer' }}
        onClick={() => setCurrentView('home')}
      >
        <div className="nav-brand-icon">
          <FileSearch size={22} />
        </div>
        <span>Resume Skill Gap Analyzer</span>
      </div>

      {/* Center Nav Links */}
      <ul className="nav-links">
        <li
          className={`nav-link-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          Home
        </li>
        <li
          className={`nav-link-item ${currentView === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentView('about')}
        >
          About
        </li>
        <li
          className={`nav-link-item ${currentView === 'features' ? 'active' : ''}`}
          onClick={() => setCurrentView('features')}
        >
          Features
        </li>
        {user && (
          <li
            className={`nav-link-item ${currentView.startsWith('dashboard') ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard-upload')}
          >
            Dashboard
          </li>
        )}
      </ul>

      {/* Right Actions / Auth / MongoDB Status */}
      <div className="nav-actions">
        {/* MongoDB Direct Connection Live Badge */}
        <div
          title={dbStatus.connected ? 'Directly Connected to MongoDB' : 'Connecting to MongoDB...'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: dbStatus.connected ? '#ecfdf5' : '#fffbeb',
            color: dbStatus.connected ? '#059669' : '#d97706',
            border: `1px solid ${dbStatus.connected ? '#a7f3d0' : '#fde68a'}`,
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: dbStatus.connected ? '#10b981' : '#f59e0b',
              display: 'inline-block',
              animation: 'pulse 2s infinite',
            }}
          />
          <Database size={13} />
          <span>{dbStatus.connected ? 'MongoDB Active' : 'Connecting DB'}</span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setCurrentView('dashboard-upload')}
              className="btn-primary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f1f5f9',
                padding: '0.4rem 0.8rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              <User size={16} color="#2563eb" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="btn-secondary"
              style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setCurrentView('login')}
              className="btn-secondary"
              style={{ padding: '0.6rem 1.2rem' }}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView('register')}
              className="btn-primary"
              style={{ padding: '0.6rem 1.3rem' }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
