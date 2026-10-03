import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, Award, Check, Plus, Trash2, Sparkles } from 'lucide-react';
import { calculateClientGapAnalysis, extractFlatUserSkills, categorizeSkills } from '../utils/skillMatcher';

export default function SkillGapAnalysisView({ analysisData, onContinueToSuggestions, onUpdateSkills }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'missing', 'matched'
  const [newCustomSkill, setNewCustomSkill] = useState('');

  const data = analysisData || {};
  const targetRole = data.targetRole || { roleId: 'web-developer', title: 'Web Developer' };

  // Current user skills extracted
  const rawSkillsSource = data.extractedSkills || data.userSkills || [];
  const [localSkills, setLocalSkills] = useState(extractFlatUserSkills(rawSkillsSource));

  // Keep local skills in sync if external analysisData changes significantly
  React.useEffect(() => {
    const extracted = extractFlatUserSkills(data.extractedSkills || data.userSkills || []);
    if (extracted.length > 0 && extracted.length !== localSkills.length) {
      setLocalSkills(extracted);
    }
  }, [data.extractedSkills, data.userSkills]);

  // Compute live gap analysis strictly on current active skills
  const liveAnalysis = calculateClientGapAnalysis(
    localSkills,
    targetRole.roleId
  );

  const activeComparison = liveAnalysis.skillComparison;
  const matchedCount = liveAnalysis.summaryStats.matchedCount;
  const missingCount = liveAnalysis.summaryStats.missingCount;
  const matchScore = liveAnalysis.matchScore;

  // Add a skill to user profile in real-time
  const handleAddSkill = (skillToAdd) => {
    if (!skillToAdd || !skillToAdd.trim()) return;
    const clean = skillToAdd.trim();
    if (localSkills.some((s) => s.toLowerCase() === clean.toLowerCase())) return;

    const updated = [...localSkills, clean];
    setLocalSkills(updated);
    if (onUpdateSkills) {
      onUpdateSkills(categorizeSkills(updated));
    }
    setNewCustomSkill('');
  };

  // Remove a skill from user profile in real-time
  const handleRemoveSkill = (skillToRemove) => {
    const updated = localSkills.filter((s) => s.toLowerCase() !== skillToRemove.toLowerCase());
    setLocalSkills(updated);
    if (onUpdateSkills) {
      onUpdateSkills(categorizeSkills(updated));
    }
  };

  // Filter comparison list based on active filter button
  const filteredComparison = activeComparison.filter((item) => {
    if (filterMode === 'missing') return item.status === 'missing' || item.status === 'partial';
    if (filterMode === 'matched') return item.status === 'matched';
    return true;
  });

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '2.5rem' }}>
      {/* Header matching prototype screen 8 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.25rem' }}>
            Skill Gap Analysis ({targetRole.title})
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Direct comparison between your profile competencies and role benchmarks.
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '0.5rem', gap: '2px' }}>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '0.4rem',
              border: 'none',
              cursor: 'pointer',
              background: filterMode === 'all' ? '#ffffff' : 'transparent',
              color: filterMode === 'all' ? '#2563eb' : '#64748b',
              boxShadow: filterMode === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            All Skills ({activeComparison.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('missing')}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '0.4rem',
              border: 'none',
              cursor: 'pointer',
              background: filterMode === 'missing' ? '#ffffff' : 'transparent',
              color: filterMode === 'missing' ? '#ef4444' : '#64748b',
              boxShadow: filterMode === 'missing' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Missing Only ({missingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('matched')}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '0.4rem',
              border: 'none',
              cursor: 'pointer',
              background: filterMode === 'matched' ? '#ffffff' : 'transparent',
              color: filterMode === 'matched' ? '#10b981' : '#64748b',
              boxShadow: filterMode === 'matched' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            Matched Only ({matchedCount})
          </button>
        </div>
      </div>

      {/* Synchronized Score & Status Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>ROLE MATCH</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b' }}>{matchScore}%</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>MATCHED SKILLS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#16a34a' }}>{matchedCount}</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: missingCount > 0 ? '#fee2e2' : '#dcfce7', color: missingCount > 0 ? '#dc2626' : '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {missingCount > 0 ? <XCircle size={22} /> : <Check size={22} />}
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>MISSING SKILLS</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: missingCount > 0 ? '#dc2626' : '#16a34a' }}>{missingCount}</div>
          </div>
        </div>
      </div>

      {/* Quick Add Bar for Missing Skills */}
      {missingCount > 0 && (
        <div
          style={{
            background: '#f8fafc',
            border: '1px dashed #cbd5e1',
            borderRadius: '0.75rem',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#475569', fontWeight: 600 }}>
            <Sparkles size={16} color="#2563eb" />
            <span>Have these skills in your profile? 1-Click to add and match:</span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {liveAnalysis.missingSkills.slice(0, 5).map((mSkill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSkill(mSkill)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #93c5fd',
                  color: '#1d4ed8',
                  borderRadius: '0.375rem',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <Plus size={13} />
                <span>Add {mSkill}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Matrix (Screen 8) */}
      <div className="gap-analysis-table">
        {/* Column 1: Your Skills */}
        <div className="gap-column-card">
          <div className="gap-column-header your-skills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Your Skills</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
              {localSkills.length} Extracted
            </span>
          </div>

          {/* Inline skill add input */}
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSkill(newCustomSkill);
              }}
              style={{ display: 'flex', gap: '0.4rem' }}
            >
              <input
                type="text"
                placeholder="+ Add skill (e.g. HTML, CSS, MongoDB)"
                value={newCustomSkill}
                onChange={(e) => setNewCustomSkill(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.82rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
            </form>
          </div>

          <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {localSkills.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                No skills extracted yet. Add skills above.
              </div>
            ) : (
              localSkills.map((skill, idx) => (
                <div key={idx} className="gap-row-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>{skill}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#dcfce7',
                        color: '#16a34a',
                      }}
                      title="Verified in Your Profile"
                    >
                      <CheckCircle2 size={16} />
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title={`Remove ${skill}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Required Skills (Job Role) */}
        <div className="gap-column-card">
          <div className="gap-column-header required-skills">
            <span>Required Skills ({targetRole.title})</span>
            <span style={{ fontSize: '0.82rem', color: '#1e40af', fontWeight: 600 }}>
              Status
            </span>
          </div>

          <div>
            {filteredComparison.length === 0 ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: '#059669' }}>
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.75rem auto' }} />
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                  {filterMode === 'missing'
                    ? '🎉 No Missing Skills Detected!'
                    : 'No skills matching this filter.'}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                  {filterMode === 'missing'
                    ? 'Your profile satisfies all core requirements for this role.'
                    : ''}
                </div>
              </div>
            ) : (
              filteredComparison.map((item, idx) => {
                const isMatched = item.status === 'matched';
                const isPartial = item.status === 'partial';
                return (
                  <div key={idx} className="gap-row-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
                      {item.skillName}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isMatched ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#dcfce7',
                            color: '#16a34a',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '0.35rem',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                          }}
                          title="Matched in your profile"
                        >
                          <CheckCircle2 size={14} />
                          <span>Matched</span>
                        </span>
                      ) : isPartial ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#fef3c7',
                            color: '#d97706',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '0.35rem',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                          }}
                          title="Partial match"
                        >
                          <AlertCircle size={14} />
                          <span>Partial</span>
                        </span>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              background: '#fee2e2',
                              color: '#dc2626',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '0.35rem',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                            }}
                            title="Missing Skill"
                          >
                            <XCircle size={14} />
                            <span>Missing</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleAddSkill(item.skillName)}
                            style={{
                              background: '#eff6ff',
                              border: '1px solid #bfdbfe',
                              color: '#2563eb',
                              padding: '0.2rem 0.45rem',
                              borderRadius: '0.35rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                            }}
                            title={`Add ${item.skillName} to my skills`}
                          >
                            <Plus size={12} />
                            <span>Add</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA to Suggestions */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={onContinueToSuggestions}
          className="btn-primary"
          style={{ padding: '0.85rem 2.2rem' }}
        >
          <span>View Improvement Suggestions & Roadmap</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
