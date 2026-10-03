import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Trash2, Eye, Calendar, Award, Database, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MyReportsView({ onLoadReport, onStartNewUpload }) {
  const { showToast, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get('/api/resume/reports', { headers });
      if (res.data.success) {
        setReports(res.data.reports || []);
      }
    } catch (err) {
      showToast('Error loading reports from MongoDB', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [token]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this report from MongoDB?')) return;

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.delete(`/api/resume/reports/${id}`, { headers });
      if (res.data.success) {
        showToast('Report deleted from MongoDB', 'info');
        setReports((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      showToast('Failed to delete report', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: '#0f172a' }}>Saved Reports</h2>
            <span
              style={{
                background: '#ecfdf5',
                color: '#059669',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                border: '1px solid #a7f3d0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Database size={12} />
              <span>MongoDB Synced</span>
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            Historical resume evaluations and skill gap analyses stored in your database.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={fetchReports}
            className="btn-secondary"
            style={{ padding: '0.6rem 1rem' }}
            title="Refresh from MongoDB"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={onStartNewUpload}
            className="btn-primary"
            style={{ padding: '0.6rem 1.3rem' }}
          >
            <span>+ New Resume Analysis</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
          <RefreshCw size={32} className="spin" style={{ margin: '0 auto 1rem auto' }} />
          <div>Querying MongoDB database...</div>
        </div>
      ) : reports.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
            }}
          >
            <FileText size={32} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>
            No Saved Reports Found in MongoDB
          </h3>
          <p style={{ color: '#64748b', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
            Upload a resume and perform your first skill gap analysis to automatically save results here.
          </p>
          <button onClick={onStartNewUpload} className="btn-primary">
            Upload Resume Now
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reports.map((report) => (
            <div
              key={report._id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => onLoadReport(report)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {/* Score Pill */}
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '0.75rem',
                    background:
                      report.matchScore >= 70
                        ? '#ecfdf5'
                        : report.matchScore >= 50
                        ? '#fffbeb'
                        : '#fef2f2',
                    color:
                      report.matchScore >= 70
                        ? '#059669'
                        : report.matchScore >= 50
                        ? '#d97706'
                        : '#dc2626',
                    border: `1px solid ${
                      report.matchScore >= 70
                        ? '#a7f3d0'
                        : report.matchScore >= 50
                        ? '#fde68a'
                        : '#fecaca'
                    }`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                    {report.matchScore}%
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>MATCH</span>
                </div>

                {/* Report Details */}
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem' }}>
                    {report.candidateInfo?.name || 'Candidate'} —{' '}
                    <span style={{ color: '#2563eb' }}>{report.targetRole?.title}</span>
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      color: '#64748b',
                      fontSize: '0.85rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>📁 {report.resumeFileName}</span>
                    <span>
                      📅 {new Date(report.createdAt).toLocaleDateString()} at{' '}
                      {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span>
                      ✅ Matched: {report.summaryStats?.matchedCount || 0} | ❌ Missing:{' '}
                      {report.summaryStats?.missingCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onLoadReport(report)}
                  className="btn-outline"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Eye size={15} />
                  <span>View</span>
                </button>
                <button
                  onClick={(e) => handleDelete(report._id, e)}
                  style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    padding: '0.5rem 0.65rem',
                    borderRadius: '0.5rem',
                  }}
                  title="Delete from MongoDB"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
