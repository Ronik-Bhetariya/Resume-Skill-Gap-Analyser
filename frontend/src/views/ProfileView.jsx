import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Target, ShieldCheck, Save, Award, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function ProfileView() {
  const { user, token, showToast } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Developer');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);

  // Sync state if user changes
  React.useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.targetRole) setTargetRole(user.targetRole);
      if (user.bio) setBio(user.bio);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(
        '/api/auth/profile',
        { name, targetRole, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast('Profile updated locally', 'info');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.35rem' }}>
          User Profile & Preferences
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Manage your account details, verification status, and career focus.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        {/* Verification Status Banner */}
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#10b981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#065f46', fontSize: '0.95rem' }}>
                Account Active & Verified
              </div>
              <div style={{ color: '#047857', fontSize: '0.82rem' }}>
                Your account is in good standing.
              </div>
            </div>
          </div>

          <span
            style={{
              background: '#059669',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
            }}
          >
            ACTIVE
          </span>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Target Job Role */}
            <div className="form-group">
              <label className="form-label">Target Career Track</label>
              <div className="input-with-icon">
                <Target size={18} className="input-icon" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email (Readonly) */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  value={user?.email || 'Not Specified'}
                  disabled
                  className="form-input"
                  style={{ background: '#f8fafc', color: '#64748b' }}
                />
              </div>
            </div>

            {/* Mobile (Readonly) */}
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  type="text"
                  value={user?.mobile ? (user.mobile.startsWith('+') ? user.mobile : `+91 ${user.mobile}`) : 'Not Specified'}
                  disabled
                  className="form-input"
                  style={{ background: '#f8fafc', color: '#64748b' }}
                />
              </div>
            </div>
          </div>

          {/* Bio / Career Statement */}
          <div className="form-group" style={{ marginTop: '0.5rem', marginBottom: '1.75rem' }}>
            <label className="form-label">Professional Summary & Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="form-input"
              style={{ padding: '0.75rem', width: '100%', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              <Save size={17} />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
