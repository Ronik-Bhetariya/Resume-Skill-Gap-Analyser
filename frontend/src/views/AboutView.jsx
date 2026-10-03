import React from 'react';
import { Target, Users, ShieldCheck, Database, Award, ArrowRight } from 'lucide-react';

export default function AboutView({ onGetStarted }) {
  return (
    <div style={{ maxWidth: '960px', margin: '3rem auto', padding: '0 1.5rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
          About Our Mission
        </span>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginTop: '0.4rem' }}>
          Empowering Job Seekers with AI & Data
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '640px', margin: '0.75rem auto 0 auto' }}>
          Resume Skill Gap Analyzer was built to eliminate the guesswork from technical job preparation by providing instant, transparent, and actionable gap analysis.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '1rem' }}>
          Why Resume Skill Gap Analyzer?
        </h3>
        <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          In today's fast-evolving tech landscape, job descriptions change rapidly. Candidates often get rejected by automated Applicant Tracking Systems (ATS) without understanding which critical skills were missing from their resumes.
        </p>
        <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7 }}>
          Our system bridges this gap by directly comparing your extracted competencies against curated industry job role matrices, generating real-time match percentages, and providing concrete 30-day learning pathways with verified documentation and tutorials.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ width: '44px', height: '44px', borderRadius: '0.5rem', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Database size={22} />
          </div>
          <h4 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.4rem' }}>Direct MongoDB Integration</h4>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Every resume parsed and evaluated is reliably stored directly in MongoDB, enabling full historical tracking and progress monitoring over time.
          </p>
        </div>

        <div className="card">
          <div style={{ width: '44px', height: '44px', borderRadius: '0.5rem', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShieldCheck size={22} />
          </div>
          <h4 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.4rem' }}>Mobile OTP Verified Security</h4>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            User authentication is reinforced with dual-layer security featuring 6-digit mobile OTP verification upon registration.
          </p>
        </div>

        <div className="card">
          <div style={{ width: '44px', height: '44px', borderRadius: '0.5rem', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Target size={22} />
          </div>
          <h4 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.4rem' }}>Actionable Learning Paths</h4>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Unlike generic feedback, we deliver hand-curated links to official documentation, top YouTube crash courses, and interactive practice sandboxes.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={onGetStarted} className="btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
          <span>Try It Free Today</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
