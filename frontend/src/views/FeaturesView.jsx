import React from 'react';
import {
  FileText,
  Scale,
  BrainCircuit,
  ShieldCheck,
  Download,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function FeaturesView({ onGetStarted }) {
  const features = [
    {
      icon: FileText,
      color: '#2563eb',
      bg: '#eff6ff',
      title: 'Multiformat Resume Parsing',
      desc: 'High-accuracy text extraction from PDF, DOCX, DOC, and TXT files, detecting contact info, education, and years of experience.',
    },
    {
      icon: Scale,
      color: '#059669',
      bg: '#ecfdf5',
      title: 'Real-time Skill Gap Matrix',
      desc: 'Side-by-side comparative table highlighting matched skills with green checkmarks and missing competencies with red crosses.',
    },
    {
      icon: BrainCircuit,
      color: '#7c3aed',
      bg: '#f5f3ff',
      title: '300+ Tech Skill Taxonomy',
      desc: 'Comprehensive database indexing languages, web frameworks, cloud providers, DevOps tools, databases, and core soft skills.',
    },
    {
      icon: ShieldCheck,
      color: '#d97706',
      bg: '#fffbeb',
      title: 'Mobile OTP Verification',
      desc: 'Secure registration workflow powered by 6-digit cryptographic mobile OTP validation before account creation.',
    },
    {
      icon: Download,
      color: '#0891b2',
      bg: '#ecfeff',
      title: 'Exportable PDF Reports',
      desc: 'One-click downloadable executive PDF reports containing overall score donut meters, skill gaps, and custom action plans.',
    },
    {
      icon: Database,
      color: '#dc2626',
      bg: '#fef2f2',
      title: 'Direct MongoDB Storage',
      desc: 'Instant persistent storage of users, OTPs, evaluations, and historical scan logs in a local/cloud MongoDB database.',
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '3rem auto', padding: '0 1.5rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
          Comprehensive Feature Set
        </span>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginTop: '0.4rem' }}>
          Everything You Need to Ace Tech Hiring
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '640px', margin: '0.75rem auto 0 auto' }}>
          Explore the industry-grade features built into the Resume Skill Gap Analyzer.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  background: f.bg,
                  color: f.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                {f.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={onGetStarted} className="btn-primary" style={{ padding: '0.85rem 2.4rem', fontSize: '1.05rem' }}>
          <span>Get Started Now</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
