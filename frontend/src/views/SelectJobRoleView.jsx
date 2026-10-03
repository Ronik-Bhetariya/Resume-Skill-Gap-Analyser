import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Code,
  BarChart3,
  Monitor,
  Smartphone,
  BrainCircuit,
  Cloud,
  Shield,
  Palette,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SelectJobRoleView({ onRoleSelected, initialRoleId = 'software-developer' }) {
  const { showToast, token } = useAuth();
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(initialRoleId);
  const [loading, setLoading] = useState(false);

  // Icon mapping
  const getIcon = (roleId) => {
    switch (roleId) {
      case 'software-developer':
        return <Code size={28} />;
      case 'data-analyst':
        return <BarChart3 size={28} />;
      case 'web-developer':
        return <Monitor size={28} />;
      case 'mobile-app-developer':
        return <Smartphone size={28} />;
      case 'ai-ml-engineer':
        return <BrainCircuit size={28} />;
      case 'cloud-engineer':
        return <Cloud size={28} />;
      default:
        return <Code size={28} />;
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get('/api/job-roles');
        if (res.data.success && res.data.roles) {
          setRoles(res.data.roles);
        }
      } catch (err) {
        // Fallback default roles with 4-12 LPA INR salary ranges
        setRoles([
          { roleId: 'software-developer', title: 'Software Developer', salaryRange: '₹5,00,000 - ₹12,00,000 / yr (5 - 12 LPA)' },
          { roleId: 'data-analyst', title: 'Data Analyst', salaryRange: '₹4,50,000 - ₹9,00,000 / yr (4.5 - 9 LPA)' },
          { roleId: 'web-developer', title: 'Web Developer', salaryRange: '₹4,00,000 - ₹8,50,000 / yr (4 - 8.5 LPA)' },
          { roleId: 'mobile-app-developer', title: 'Mobile App Developer', salaryRange: '₹4,50,000 - ₹10,00,000 / yr (4.5 - 10 LPA)' },
          { roleId: 'ai-ml-engineer', title: 'AI / ML Engineer', salaryRange: '₹6,00,000 - ₹12,00,000 / yr (6 - 12 LPA)' },
          { roleId: 'cloud-engineer', title: 'Cloud Engineer', salaryRange: '₹5,50,000 - ₹11,50,000 / yr (5.5 - 11.5 LPA)' },
        ]);
      }
    };
    fetchRoles();
  }, []);

  // Helper to format salary ensuring INR 4-12 LPA
  const formatSalary = (salary) => {
    if (!salary) return '₹4,00,000 - ₹12,00,000 / yr (4 - 12 LPA)';
    if (salary.includes('$')) {
      return '₹5,00,000 - ₹12,00,000 / yr (5 - 12 LPA)';
    }
    return salary;
  };

  const handleContinue = () => {
    if (!selectedRoleId) {
      showToast('Please select a target job role', 'error');
      return;
    }
    const selectedRole = roles.find((r) => r.roleId === selectedRoleId) || roles[0];
    onRoleSelected(selectedRole);
  };

  return (
    <div className="card" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header matching prototype screen 5 */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.35rem' }}>
          Select Job Role
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Choose a job role to compare your skills with required skills
        </p>
      </div>

      {/* Role selection grid matching prototype */}
      <div className="job-role-grid">
        {roles.map((role) => {
          const isSelected = selectedRoleId === role.roleId;
          return (
            <div
              key={role.roleId}
              className={`job-role-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedRoleId(role.roleId)}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#2563eb',
                  }}
                >
                  <CheckCircle2 size={18} />
                </div>
              )}

              <div className="role-icon-box">{getIcon(role.roleId)}</div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                {role.title}
              </h3>

              {role.salaryRange && (
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#047857',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    padding: '0.25rem 0.55rem',
                    borderRadius: '0.375rem',
                    fontWeight: 600,
                    marginTop: '0.4rem',
                    textAlign: 'center',
                  }}
                >
                  {formatSalary(role.salaryRange)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Role Skill preview */}
      {selectedRoleId && (
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#334155', marginBottom: '0.5rem' }}>
            Core Skills Evaluated for this Role:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(
              roles.find((r) => r.roleId === selectedRoleId)?.requiredSkills || [
                'JavaScript',
                'HTML',
                'CSS',
                'React',
                'Node.js',
                'Express.js',
                'MongoDB',
                'SQL',
                'Python',
                'Git',
              ]
            ).map((skill, idx) => (
              <span
                key={idx}
                style={{
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  border: '1px solid #bfdbfe',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Continue CTA matching prototype */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={handleContinue}
          className="btn-primary"
          style={{ padding: '0.8rem 3.5rem', fontSize: '1rem' }}
        >
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
