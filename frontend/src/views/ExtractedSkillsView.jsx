import React, { useState, useEffect } from 'react';
import { Plus, X, Sparkles, ArrowRight, Code, Users, Wrench, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { canonicalizeSkillName } from '../utils/skillMatcher';

export default function ExtractedSkillsView({ extractedSkills, onUpdateSkills, onContinueToGap }) {
  const { showToast } = useAuth();

  const [skills, setSkills] = useState(
    extractedSkills || {
      technical: [],
      soft: [],
      tools: [],
      cloudAndDb: [],
    }
  );

  useEffect(() => {
    if (extractedSkills) {
      setSkills({
        technical: extractedSkills.technical || [],
        soft: extractedSkills.soft || [],
        tools: extractedSkills.tools || [],
        cloudAndDb: extractedSkills.cloudAndDb || [],
      });
    }
  }, [extractedSkills]);

  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('technical');
  const [showAddModal, setShowAddModal] = useState(false);

  // Quick skill suggestions
  const quickSuggestions = [
    { name: 'HTML', category: 'technical' },
    { name: 'CSS', category: 'technical' },
    { name: 'MongoDB', category: 'cloudAndDb' },
    { name: 'JavaScript', category: 'technical' },
    { name: 'React', category: 'technical' },
    { name: 'Node.js', category: 'technical' },
    { name: 'Express.js', category: 'technical' },
    { name: 'Tailwind CSS', category: 'technical' },
    { name: 'SQL', category: 'technical' },
    { name: 'Python', category: 'technical' },
    { name: 'Git', category: 'tools' },
  ];

  // Remove a skill
  const handleRemoveSkill = (category, skillToRemove) => {
    const updated = {
      ...skills,
      [category]: (skills[category] || []).filter((s) => s.toLowerCase() !== skillToRemove.toLowerCase()),
    };
    setSkills(updated);
    if (onUpdateSkills) onUpdateSkills(updated);
    showToast(`Removed "${skillToRemove}"`, 'info');
  };

  // Add a new skill
  const handleDirectAdd = (skillName, category = 'technical') => {
    const canonical = canonicalizeSkillName(skillName);
    const catList = skills[category] || [];
    if (catList.some((s) => s.toLowerCase() === canonical.toLowerCase())) {
      showToast(`"${canonical}" is already in your skills`, 'info');
      return;
    }

    const updated = {
      ...skills,
      [category]: [...catList, canonical],
    };
    if (category === 'cloudAndDb') {
      const techList = updated.technical || [];
      if (!techList.some((s) => s.toLowerCase() === canonical.toLowerCase())) {
        updated.technical = [...techList, canonical];
      }
    }
    setSkills(updated);
    if (onUpdateSkills) onUpdateSkills(updated);
    showToast(`Added "${canonical}" to skills!`, 'success');
  };

  // Add a new custom skill from modal
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;

    const trimmed = newSkillText.trim();
    handleDirectAdd(trimmed, newSkillCategory);
    setNewSkillText('');
    setShowAddModal(false);
  };

  return (
    <div className="card" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header matching prototype screen 7 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.35rem' }}>
            Extracted Skills from Resume
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Skills automatically identified and categorized by AI parsing.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-outline"
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
        >
          <Plus size={16} />
          <span>Add Custom Skill</span>
        </button>
      </div>

      {/* Quick Add Toolbar */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
          <Sparkles size={16} color="#2563eb" />
          <span>Popular Skills (Click to 1-Click Add):</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {quickSuggestions.map((item, idx) => {
            const hasIt = (skills[item.category] || []).some((s) => s.toLowerCase() === item.name.toLowerCase()) ||
              (skills.technical || []).some((s) => s.toLowerCase() === item.name.toLowerCase());
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDirectAdd(item.name, item.category)}
                disabled={hasIt}
                style={{
                  background: hasIt ? '#dcfce7' : '#ffffff',
                  color: hasIt ? '#16a34a' : '#1e293b',
                  border: hasIt ? '1px solid #86efac' : '1px solid #cbd5e1',
                  borderRadius: '0.4rem',
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: hasIt ? 'default' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s ease',
                }}
              >
                {hasIt ? <Check size={13} /> : <Plus size={13} />}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Technical Skills */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Code size={18} color="#059669" />
          <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>Technical Skills</h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            ({skills.technical?.length || 0})
          </span>
        </div>

        <div className="skills-badge-group">
          {(skills.technical || []).map((skill, idx) => (
            <div key={idx} className="skill-tag-tech">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill('technical', skill)}
                style={{ background: 'none', color: '#065f46', display: 'flex', alignItems: 'center', padding: '1px' }}
                title="Remove skill"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Soft Skills */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Users size={18} color="#2563eb" />
          <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>Soft Skills</h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            ({skills.soft?.length || 0})
          </span>
        </div>

        <div className="skills-badge-group">
          {(skills.soft || []).map((skill, idx) => (
            <div key={idx} className="skill-tag-soft">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill('soft', skill)}
                style={{ background: 'none', color: '#3730a3', display: 'flex', alignItems: 'center', padding: '1px' }}
                title="Remove skill"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tools & Technologies */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Wrench size={18} color="#ea580c" />
          <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>Tools & Technologies</h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            ({skills.tools?.length || 0})
          </span>
        </div>

        <div className="skills-badge-group">
          {(skills.tools || []).map((skill, idx) => (
            <div key={idx} className="skill-tag-tool">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill('tools', skill)}
                style={{ background: 'none', color: '#9a3412', display: 'flex', alignItems: 'center', padding: '1px' }}
                title="Remove skill"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Continue Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
        <button
          onClick={onContinueToGap}
          className="btn-primary"
          style={{ padding: '0.75rem 2rem' }}
        >
          <span>Proceed to Skill Gap Matrix</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0f172a' }}>
              Add Skill to Resume
            </h3>

            <form onSubmit={handleAddSkill}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '0.9rem' }}
                >
                  <option value="technical">Technical Skill (e.g. HTML, CSS, React, MongoDB, SQL, Python)</option>
                  <option value="soft">Soft Skill (e.g. Leadership, Communication)</option>
                  <option value="tools">Tool & Technology (e.g. Git, Docker, Postman)</option>
                  <option value="cloudAndDb">Database & Cloud (e.g. MongoDB, MySQL, AWS)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  value={newSkillText}
                  onChange={(e) => setNewSkillText(e.target.value)}
                  placeholder="e.g. HTML, CSS, MongoDB, GraphQL, Tailwind CSS"
                  className="form-input"
                  style={{ paddingLeft: '0.9rem' }}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
