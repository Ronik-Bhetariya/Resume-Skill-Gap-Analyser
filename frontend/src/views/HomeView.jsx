import React from 'react';
import HeroGraphic from '../components/HeroGraphic';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Award, Layers, Target, Users } from 'lucide-react';

export default function HomeView({ onGetStarted, onLogin }) {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* 1. Hero Section (Matching Prototype Screen 1) */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} color="#2563eb" />
            <span>AI-Powered Career Intelligence</span>
          </div>

          <h1 className="hero-title">
            Analyze Your Resume<br />
            Find <span>Skill Gaps</span><br />
            Build a Better Career
          </h1>

          <p className="hero-desc">
            Upload your resume and get AI-powered skill analysis, compare with
            industry job requirements and receive personalized suggestions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={onGetStarted}
              className="btn-primary"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline"
              style={{ padding: '0.85rem 1.6rem' }}
            >
              How It Works
            </button>
          </div>

          {/* Quick trust metrics */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.88rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>Instant AI Parsing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.88rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>Mobile OTP Verified</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.88rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>MongoDB Saved</span>
            </div>
          </div>
        </div>

        <div className="hero-graphic">
          <HeroGraphic />
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section style={{ maxWidth: '1200px', margin: '1rem auto 4rem auto', padding: '0 1.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #09172f 0%, #0c2044 100%)',
            color: 'white',
            borderRadius: '1.25rem',
            padding: '2.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(15, 23, 42, 0.15)',
          }}
        >
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#60a5fa' }}>94%</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>Interview Shortlist Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399' }}>50,000+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>Resumes Analyzed</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fbbf24' }}>300+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>Tech Skills Indexed</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a78bfa' }}>10+</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>Curated Tech Roles</div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Pipeline */}
      <section id="how-it-works" style={{ maxWidth: '1200px', margin: '0 auto 5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Simple 4-Step Process
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', color: '#0f172a' }}>
            How Skill Gap Analyzer Works
          </h2>
          <p style={{ color: '#64748b', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            A smooth, end-to-end evaluation pipeline that turns resume weaknesses into high-impact career strengths.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {/* Step 1 */}
          <div className="card" style={{ textAlign: 'left', position: 'relative' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '0.75rem',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: '1rem',
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Upload Resume</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
              Drag and drop your PDF or Word document. Our engine extracts your technical skills, soft skills, and experience in milliseconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="card" style={{ textAlign: 'left' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '0.75rem',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: '1rem',
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Select Target Role</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
              Choose your dream role from Software Developer, Data Analyst, Web Developer, AI/ML, Cloud, and more.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ textAlign: 'left' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '0.75rem',
                background: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: '1rem',
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Instant Gap Matrix</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
              Get a side-by-side breakdown of matched skills vs missing requirements along with your overall match score gauge.
            </p>
          </div>

          {/* Step 4 */}
          <div className="card" style={{ textAlign: 'left' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '0.75rem',
                background: '#f5f3ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: '1rem',
              }}
            >
              4
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Actionable Roadmap</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
              Access free curated resources, documentation, videos, and a step-by-step 30-day learning path to bridge every skill gap.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA banner */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
            color: 'white',
            borderRadius: '1.5rem',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(37, 99, 235, 0.25)',
          }}
        >
          <h2 style={{ fontSize: '2.4rem', color: 'white', marginBottom: '1rem' }}>
            Ready to Discover Your True Career Potential?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#dbeafe', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Join thousands of developers and analysts preparing for top industry roles today.
          </p>
          <button
            onClick={onGetStarted}
            className="btn-primary"
            style={{
              background: '#ffffff',
              color: '#1d4ed8',
              padding: '0.9rem 2.4rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            Start Free Analysis Now →
          </button>
        </div>
      </section>
    </div>
  );
}
