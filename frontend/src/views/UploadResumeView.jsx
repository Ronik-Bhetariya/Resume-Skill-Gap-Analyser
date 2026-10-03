import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, ArrowRight, Sparkles, AlertCircle, RefreshCw, Clipboard, FileCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function UploadResumeView({ onUploadComplete, currentData }) {
  const { showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'paste'
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    const validExts = ['doc', 'docx', 'txt'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!validExts.includes(ext)) {
      showToast('Please upload a Word (.docx / .doc) or Text (.txt) file, or use Paste Resume Text', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('File size exceeds 5 MB limit', 'error');
      return;
    }

    setSelectedFile(file);
    uploadToServer(file);
  };

  const uploadToServer = async (file) => {
    setUploading(true);
    setUploadProgress(25);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setUploadProgress(70);
      const res = await axios.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadProgress(100);
      if (res.data.success) {
        showToast('Resume parsed successfully! Extracted skills from your resume.', 'success');
        setTimeout(() => {
          onUploadComplete(res.data.data);
        }, 500);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error parsing resume file';
      showToast(msg, 'error');
      setUploading(false);
    }
  };

  const handleAnalyzePastedText = async () => {
    if (!pastedText || pastedText.trim().length < 20) {
      showToast('Please paste valid resume content (at least 20 characters)', 'error');
      return;
    }

    setUploading(true);
    setUploadProgress(35);

    try {
      setUploadProgress(70);
      const res = await axios.post('/api/resume/upload', {
        resumeText: pastedText,
        fileName: 'Pasted_Candidate_Resume.txt',
      });

      setUploadProgress(100);
      if (res.data.success) {
        showToast('Resume text parsed successfully!', 'success');
        setTimeout(() => {
          onUploadComplete(res.data.data);
        }, 400);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error parsing resume text';
      showToast(msg, 'error');
      setUploading(false);
    }
  };

  const handleLoadSample = async (sampleKey) => {
    setUploading(true);
    setUploadProgress(40);
    try {
      const res = await axios.post('/api/resume/upload', { sampleKey });
      setUploadProgress(100);
      if (res.data.success) {
        showToast('Sample resume loaded successfully!', 'success');
        setTimeout(() => {
          onUploadComplete(res.data.data);
        }, 400);
      }
    } catch (error) {
      showToast('Failed to load sample resume', 'error');
      setUploading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.35rem' }}>
          Upload Resume
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Upload your resume file (.docx, .doc, .txt) or paste your resume text to extract skills with 100% accuracy.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setActiveTab('file')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 1.1rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'file' ? '#eff6ff' : 'transparent',
            color: activeTab === 'file' ? '#2563eb' : '#64748b',
          }}
        >
          <UploadCloud size={16} />
          Upload Word / Document (.DOCX, .DOC, .TXT)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 1.1rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'paste' ? '#eff6ff' : 'transparent',
            color: activeTab === 'paste' ? '#2563eb' : '#64748b',
          }}
        >
          <Clipboard size={16} />
          Paste Resume Text
        </button>
      </div>

      {/* Tab 1: File Upload Mode */}
      {activeTab === 'file' && (
        <div
          className={`dropzone-container ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.doc,.txt"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div className="dropzone-icon-circle">
            <UploadCloud size={38} />
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
            Drag & drop your Word (.docx) or Text resume here
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.25rem' }}>or</p>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.8rem', fontSize: '0.92rem' }}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Browse Word File
          </button>

          <div style={{ marginTop: '1.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>
            Supported formats: <b>DOCX, DOC, TXT</b> (Word & Plain Text Documents)
          </div>
        </div>
      )}

      {/* Tab 2: Paste Resume Text Mode */}
      {activeTab === 'paste' && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
            Paste your resume text or skills section:
          </label>
          <textarea
            rows={10}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your resume content here (e.g. Name, Summary, Skills: HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, Projects...)"
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              lineHeight: '1.5',
              resize: 'vertical',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {pastedText.trim().length} characters
            </span>
            <button
              type="button"
              onClick={handleAnalyzePastedText}
              disabled={uploading || pastedText.trim().length < 20}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.4rem',
                fontSize: '0.9rem',
                opacity: pastedText.trim().length < 20 ? 0.6 : 1,
              }}
            >
              <FileCheck size={16} />
              Extract Skills & Analyze
            </button>
          </div>
        </div>
      )}

      {/* Uploading Progress Bar */}
      {uploading && (
        <div style={{ marginTop: '1.75rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 600 }}>
            <span>Parsing resume & extracting skills...</span>
            <span style={{ color: '#2563eb' }}>{uploadProgress}%</span>
          </div>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${uploadProgress}%`,
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* 1-Click Ready Test Samples */}
      <div style={{ marginTop: '2.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#334155', fontWeight: 600, fontSize: '0.92rem' }}>
          <Sparkles size={16} color="#2563eb" />
          <span>Don't have a resume file handy? Try 1-Click Sample Resumes:</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleLoadSample('software-developer')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
          >
            💻 Software Developer (Ronik Bhetariya)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('data-analyst')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
          >
            📊 Data Analyst (Priya Sharma)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('web-developer')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
          >
            🌐 Web Developer (Aman Patel)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('ai-ml-engineer')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
          >
            🤖 AI / ML Engineer (Karan Mehta)
          </button>
        </div>
      </div>
    </div>
  );
}
