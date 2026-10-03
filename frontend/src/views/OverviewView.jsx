import React from 'react';
import { UploadCloud, Briefcase, FileText, CheckCircle2, TrendingUp, Sparkles, ArrowRight, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OverviewView({ onNavigate, latestReport }) {
  const { user, dbStatus } = useAuth();

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
      {/* Welcome Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          color: 'white',
          borderRadius: '1.25rem',
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={14} />
            <span>AI Career Readiness Hub</span>
          </div>
          <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.4rem' }}>
            Welcome back, {user?.name || 'Ronik Bhetariya'}!
          </h2>
          <p style={{ color: '#dbeafe', fontSize: '0.95rem', maxWidth: '540px' }}>
            Ready to analyze your resume and pinpoint skills needed to land your next high-growth tech role?
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard-upload')}
          className="btn-primary"
          style={{
            background: '#ffffff',
            color: '#1d4ed8',
            padding: '0.85rem 1.8rem',
            fontWeight: 700,
            fontSize: '0.95rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          }}
        >
          <UploadCloud size={18} />
          <span>Upload & Analyze Resume</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div className="card">
          <div style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 600 }}>Last Role Evaluated</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
            {latestReport?.targetRole?.title || 'Software Developer'}
          </div>
          <div style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 600 }}>
            ● Match Score: {latestReport?.matchScore || 70}%
          </div>
        </div>

        <div className="card">
          <div style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 600 }}>Database Status</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
            {dbStatus.connected ? 'MongoDB Live' : 'Connecting'}
          </div>
          <div style={{ color: dbStatus.connected ? '#10b981' : '#f59e0b', fontSize: '0.82rem', fontWeight: 600 }}>
            ● Direct DB Sync Enabled
          </div>
        </div>

        <div className="card">
          <div style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 600 }}>Security & Auth</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.4rem 0' }}>
            OTP Verified
          </div>
          <div style={{ color: '#2563eb', fontSize: '0.82rem', fontWeight: 600 }}>
            ● Mobile Verified Account
          </div>
        </div>
      </div>

      {/* Quick Access Pipeline Steps */}
      <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}>
        Resume Evaluation Pipeline
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => onNavigate('dashboard-upload')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UploadCloud size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>1. Upload Resume (Screen 4)</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>PDF, DOCX, TXT support</span>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Drag & drop or use our 1-click sample resumes to parse skills.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => onNavigate('dashboard-roles')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Briefcase size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>2. Select Job Role (Screen 5)</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Software Dev, Data Analyst...</span>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Compare your profile against top engineering industry standards.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => onNavigate('dashboard-result')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                background: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>3. View Match & PDF (Screen 6)</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Score gauge & PDF Export</span>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Inspect match %, candidate details, and download PDF reports.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => onNavigate('dashboard-skills')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                background: '#f5f3ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>4. Extracted Skills (Screen 7)</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Technical, Soft & Tools</span>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Review and customize AI extracted skill tags.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => onNavigate('dashboard-gap')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                background: '#fef2f2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>5. Gap Matrix (Screen 8)</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Side-by-side comparison</span>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            See exactly which skills you have vs what the role requires.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          onClick={() => onNavigate('dashboard-suggestions')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                background: '#ecfeff',
                color: '#0891b2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>6. Suggestions (Screen 9)</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Free resources & 30-day plan</span>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Bridge gaps with curated YouTube videos, docs, and roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}
