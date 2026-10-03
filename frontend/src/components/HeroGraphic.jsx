import React from 'react';

export default function HeroGraphic() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      {/* Decorative background glow circles */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      <svg
        viewBox="0 0 500 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 15px 25px rgba(15, 23, 42, 0.12))' }}
      >
        {/* Main Resume Document Sheet */}
        <g id="ResumeCard">
          <rect x="90" y="40" width="280" height="340" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
          
          {/* Header Profile Avatar inside Resume */}
          <circle cx="150" cy="100" r="28" fill="#DBEAFE" />
          {/* Avatar Face & Hair */}
          <circle cx="150" cy="94" r="14" fill="#3B82F6" />
          <path d="M130 120 C130 108 170 108 170 120 Z" fill="#2563eb" />

          {/* Candidate Profile Lines */}
          <rect x="195" y="82" width="135" height="12" rx="6" fill="#1E293B" />
          <rect x="195" y="102" width="90" height="8" rx="4" fill="#94A3B8" />

          {/* Divider */}
          <line x1="120" y1="140" x2="340" y2="140" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="4 4" />

          {/* Resume Body Lines */}
          <rect x="120" y="160" width="220" height="8" rx="4" fill="#CBD5E1" />
          <rect x="120" y="180" width="180" height="8" rx="4" fill="#E2E8F0" />
          <rect x="120" y="200" width="140" height="8" rx="4" fill="#E2E8F0" />
          <rect x="120" y="220" width="200" height="8" rx="4" fill="#CBD5E1" />
          <rect x="120" y="240" width="160" height="8" rx="4" fill="#E2E8F0" />
          <rect x="120" y="260" width="130" height="8" rx="4" fill="#E2E8F0" />

          {/* Skill Checkmark Badges inside Resume */}
          <rect x="120" y="295" width="65" height="22" rx="6" fill="#DCFCE7" stroke="#86EFAC" />
          <text x="132" y="310" fill="#166534" fontSize="10" fontWeight="bold" fontFamily="sans-serif">React ✓</text>

          <rect x="195" y="295" width="70" height="22" rx="6" fill="#DCFCE7" stroke="#86EFAC" />
          <text x="205" y="310" fill="#166534" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Python ✓</text>

          <rect x="275" y="295" width="65" height="22" rx="6" fill="#FEE2E2" stroke="#FCA5A5" />
          <text x="287" y="310" fill="#991B1B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Docker ✗</text>
        </g>

        {/* Growth Analytics Chart (Background Right) */}
        <g id="GrowthChart" transform="translate(380, 70)">
          <rect x="0" y="0" width="80" height="90" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <rect x="12" y="55" width="12" height="25" rx="3" fill="#93C5FD" />
          <rect x="32" y="40" width="12" height="40" rx="3" fill="#60A5FA" />
          <rect x="52" y="20" width="12" height="60" rx="3" fill="#2563EB" />
          <path d="M 18 50 L 38 35 L 58 15" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Floating Rotating Gears (Left) */}
        <g id="Gear1" transform="translate(60, 240)">
          <circle cx="25" cy="25" r="22" fill="#2563EB" opacity="0.9" />
          <circle cx="25" cy="25" r="8" fill="#FFFFFF" />
          {/* Gear teeth */}
          <rect x="22" y="0" width="6" height="50" rx="2" fill="#2563EB" />
          <rect x="0" y="22" width="50" height="6" rx="2" fill="#2563EB" />
        </g>
        <g id="Gear2" transform="translate(45, 295)">
          <circle cx="16" cy="16" r="14" fill="#3B82F6" opacity="0.8" />
          <circle cx="16" cy="16" r="5" fill="#FFFFFF" />
        </g>

        {/* Large Magnifying Glass analyzing "SKILLS" */}
        <g id="Magnifier" transform="translate(230, 130)">
          {/* Glass Handle */}
          <path d="M 105 130 L 165 190" stroke="#1E293B" strokeWidth="18" strokeLinecap="round" />
          <path d="M 105 130 L 165 190" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" />

          {/* Outer Lens Ring */}
          <circle cx="70" cy="70" r="65" fill="#FFFFFF" stroke="#1E293B" strokeWidth="8" />
          <circle cx="70" cy="70" r="58" fill="url(#lensGradient)" />

          {/* Lens Glass Highlight */}
          <path d="M 30 50 A 45 45 0 0 1 90 25" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />

          {/* "SKILLS" Text inside Lens */}
          <text
            x="70"
            y="76"
            textAnchor="middle"
            fill="#0F172A"
            fontFamily="'Outfit', sans-serif"
            fontSize="18"
            fontWeight="800"
            letterSpacing="1"
          >
            SKILLS
          </text>
        </g>

        {/* Idea Lightbulb (Bottom Right) */}
        <g id="Lightbulb" transform="translate(390, 270)">
          <circle cx="25" cy="25" r="22" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
          <path d="M 18 42 L 32 42 L 30 48 L 20 48 Z" fill="#94A3B8" />
          {/* Bulb Filament */}
          <path d="M 20 25 Q 25 15 30 25" stroke="#CA8A04" strokeWidth="2" fill="none" />
          {/* Glow Rays */}
          <line x1="25" y1="-2" x2="25" y2="4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="8" x2="40" y2="13" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="8" x2="10" y2="13" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
