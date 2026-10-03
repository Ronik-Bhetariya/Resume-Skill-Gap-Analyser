import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FileSearch,
  LayoutDashboard,
  UploadCloud,
  Briefcase,
  FileText,
  Tags,
  Scale,
  Lightbulb,
  User,
  LogOut,
  Database,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user, logout, dbStatus } = useAuth();

  const menuItems = [
    { id: 'dashboard-overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dashboard-upload', label: 'Upload Resume', icon: UploadCloud },
    { id: 'dashboard-roles', label: 'Job Roles', icon: Briefcase },
    { id: 'dashboard-result', label: 'Analysis Result', icon: FileText },
    { id: 'dashboard-skills', label: 'Extracted Skills', icon: Tags },
    { id: 'dashboard-gap', label: 'Skill Gap Analysis', icon: Scale },
    { id: 'dashboard-suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'dashboard-reports', label: 'My Reports', icon: FileText },
    { id: 'dashboard-profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="dark-sidebar">
      {/* Brand Header matching screens 4-9 */}
      <div className="sidebar-header">
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0,
          }}
        >
          <FileSearch size={19} />
        </div>
        <div className="sidebar-logo-text">Resume Skill Gap</div>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer with MongoDB status & Logout */}
      <div className="sidebar-footer">
        {/* Direct MongoDB live indicator */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.5rem',
            padding: '0.6rem 0.8rem',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            color: dbStatus.connected ? '#6ee7b7' : '#fcd34d',
          }}
        >
          <Database size={14} />
          <span>{dbStatus.connected ? 'MongoDB Active' : 'Connecting DB...'}</span>
        </div>

        {/* User Card & Logout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'white',
                flexShrink: 0,
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Guest User'}
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              background: 'none',
              color: '#94a3b8',
              padding: '0.3rem',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
