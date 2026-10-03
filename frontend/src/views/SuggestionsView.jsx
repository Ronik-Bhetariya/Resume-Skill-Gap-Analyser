import React, { useState } from 'react';
import {
  ExternalLink,
  BookOpen,
  Video,
  Code2,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  X,
} from 'lucide-react';
import { SKILL_RESOURCES, calculateClientGapAnalysis, extractFlatUserSkills } from '../utils/skillMatcher';

export default function SuggestionsView({ analysisData, recommendations, roadmap }) {
  const [activeResourceModal, setActiveResourceModal] = useState(null);

  const data = analysisData || {};
  const targetRole = data.targetRole || { roleId: 'software-developer', title: 'Software Developer' };
  const rawSkills = data.extractedSkills || data.userSkills || {
    technical: [],
    soft: [],
    tools: [],
    cloudAndDb: [],
  };

  const live = calculateClientGapAnalysis(rawSkills, targetRole.roleId);
  const missingSkills = live.missingSkills;
  const partialSkills = live.partialSkills;
  const isAllMatched = live.matchScore === 100 || missingSkills.length === 0;

  // Generate recommendation list strictly for missing skills
  let recList = [];
  if (!isAllMatched) {
    recList = live.recommendations || [];
    if (recList.length === 0) {
      recList = [...missingSkills, ...partialSkills].map((skill) => {
        const res = SKILL_RESOURCES[skill] || {
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original.svg',
          description: `${skill} is a required technical skill to excel in the ${targetRole.title} role.`,
          difficulty: 'Intermediate',
          estimatedTime: '1 - 2 Weeks',
          resources: [
            { title: `Learn ${skill} Documentation`, type: 'documentation', url: `https://www.google.com/search?q=${encodeURIComponent(skill + ' documentation')}` },
            { title: `${skill} Full Video Tutorial`, type: 'video', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + ' tutorial')}` },
            { title: `${skill} Practice Projects on GitHub`, type: 'practice', url: `https://github.com/topics/${encodeURIComponent(skill.toLowerCase())}` },
          ],
          actionSteps: [
            `Understand core principles and syntax of ${skill}`,
            `Build hands-on practice project using ${skill}`,
            `Integrate ${skill} into a portfolio application`,
          ],
        };
        return { skill, ...res };
      });
    }
  }

  const roadmapSteps = live.roadmap || (roadmap || [
    {
      week: 'Week 1',
      focus: missingSkills[0] ? `Foundations of ${missingSkills[0]}` : 'Advanced System Architecture & Performance',
      tasks: [
        `Review core documentation and master syntax for ${missingSkills[0] || 'Modern Architecture'}`,
        'Set up local development sandbox and build sample mini projects',
        'Understand asynchronous data flow and state management',
      ],
    },
    {
      week: 'Week 2',
      focus: missingSkills[1] ? `Deep Dive: ${missingSkills[1]}` : 'Database Optimization & Fullstack Integration',
      tasks: [
        `Learn best practices and configuration for ${missingSkills[1] || 'Backend Services'}`,
        'Build a mini CRUD application with robust error handling',
        'Integrate automated tests and validate edge cases',
      ],
    },
    {
      week: 'Week 3',
      focus: 'Containerization & Cloud Infrastructure',
      tasks: [
        'Containerize Frontend and Backend services with Docker & Docker Compose',
        'Set up environment variables, secret managers, and security headers',
        'Deploy project to cloud environment (Render / Vercel / AWS)',
      ],
    },
    {
      week: 'Week 4',
      focus: 'Portfolio Showcase & Technical Mock Interviews',
      tasks: [
        'Update resume with newly acquired skills and live project link',
        `Practice top 25 technical interview questions for ${targetRole.title}`,
        'Publish case study repository on GitHub with clean README documentation',
      ],
    },
  ]);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header matching prototype screen 9 */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.35rem' }}>
          Skill Improvement Suggestions ({targetRole.title})
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          {isAllMatched
            ? `Outstanding! Your profile satisfies 100% of core competencies for ${targetRole.title}.`
            : `Tailored learning recommendations with free resources to bridge the ${missingSkills.length} identified gap(s).`}
        </p>
      </div>

      {/* When all skills are matched */}
      {isAllMatched && (
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
            border: '1.5px solid #a7f3d0',
            padding: '2rem',
            marginBottom: '2.5rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#10b981',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <CheckCircle2 size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', color: '#065f46', marginBottom: '0.5rem' }}>
            🎉 100% Core Requirements Matched!
          </h3>
          <p style={{ color: '#047857', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto' }}>
            Your resume possesses all the core skills required for the <strong>{targetRole.title}</strong> role. You do not need any additional prerequisite courses. Check out the 30-day interview prep roadmap below!
          </p>
        </div>
      )}

      {/* Suggestion Cards (Matching Screen 9 Layout) */}
      {!isAllMatched && (
        <div style={{ marginBottom: '3rem' }}>
          {recList.map((item, idx) => (
            <div key={idx} className="suggestion-card">
              {/* Logo Box */}
              <div className="suggestion-logo-box">
                <img
                  src={item.icon}
                  alt={item.skill}
                  className="suggestion-logo-img"
                  onError={(e) => {
                    e.target.src = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original.svg';
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700 }}>
                    Learn {item.skill}
                  </h3>
                {item.estimatedTime && (
                  <span
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    ⏱️ {item.estimatedTime}
                  </span>
                )}
              </div>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>

            {/* View Resources CTA matching Screen 9 */}
            <div>
              <button
                type="button"
                onClick={() => setActiveResourceModal(item)}
                className="btn-outline"
                style={{
                  padding: '0.55rem 1.1rem',
                  fontSize: '0.88rem',
                  whiteSpace: 'nowrap',
                  borderRadius: '0.5rem',
                }}
              >
                <span>View Resources</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

      {/* 4-Week Actionable Learning Roadmap */}
      <div className="card" style={{ background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Calendar size={22} color="#2563eb" />
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a' }}>
            30-Day Step-by-Step Action Roadmap
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'inline-block',
                  marginBottom: '0.65rem',
                }}
              >
                {step.week}
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                {step.focus}
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {(step.tasks || []).map((task, tIdx) => (
                  <li
                    key={tIdx}
                    style={{
                      fontSize: '0.82rem',
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.4rem',
                    }}
                  >
                    <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive "View Resources" Modal */}
      {activeResourceModal && (
        <div className="modal-overlay" onClick={() => setActiveResourceModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={activeResourceModal.icon}
                  alt=""
                  style={{ width: '36px', height: '36px' }}
                />
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>
                  {activeResourceModal.skill} Learning Path
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveResourceModal(null)}
                style={{ background: 'none', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Action Steps Checklist */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '0.75rem' }}>
                Recommended Learning Milestones:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {activeResourceModal.actionSteps?.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      background: '#f8fafc',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.88rem',
                      color: '#334155',
                    }}
                  >
                    <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Resource Links */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '0.75rem' }}>
                Curated Free Courses & Guides:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {activeResourceModal.resources?.map((res, rIdx) => (
                  <a
                    key={rIdx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.625rem',
                      color: '#1d4ed8',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {res.type === 'video' ? (
                        <Video size={18} color="#ef4444" />
                      ) : res.type === 'practice' ? (
                        <Code2 size={18} color="#10b981" />
                      ) : (
                        <BookOpen size={18} color="#2563eb" />
                      )}
                      <span>{res.title}</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setActiveResourceModal(null)}
                className="btn-primary"
                style={{ padding: '0.65rem 1.6rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
