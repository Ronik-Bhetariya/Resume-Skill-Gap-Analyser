import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import FeaturesView from './views/FeaturesView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import UploadResumeView from './views/UploadResumeView';
import SelectJobRoleView from './views/SelectJobRoleView';
import ResumeResultView from './views/ResumeResultView';
import ExtractedSkillsView from './views/ExtractedSkillsView';
import SkillGapAnalysisView from './views/SkillGapAnalysisView';
import SuggestionsView from './views/SuggestionsView';
import MyReportsView from './views/MyReportsView';
import ProfileView from './views/ProfileView';
import OverviewView from './views/OverviewView';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { calculateClientGapAnalysis, extractSkillsFromResumeText, mergeSkillSets } from './utils/skillMatcher';

function AppContent() {
  const { user, token, showToast } = useAuth();

  // Navigation State
  const [currentView, setCurrentView] = useState('home');

  // Resume Data State
  const [resumeData, setResumeData] = useState({
    fileName: '',
    fileSize: '',
    candidateInfo: {
      name: '',
      email: '',
      phone: '',
      experience: '',
      education: '',
    },
    extractedSkills: {
      technical: [],
      soft: [],
      tools: [],
      cloudAndDb: [],
    },
    resumeText: '',
  });

  const [selectedRole, setSelectedRole] = useState({
    roleId: 'software-developer',
    title: 'Software Developer',
  });

  const [analysisResult, setAnalysisResult] = useState(null);

  const activeExtractedSkills = resumeData.extractedSkills || analysisResult?.extractedSkills || {
    technical: [],
    soft: [],
    tools: [],
    cloudAndDb: [],
  };

  const currentRoleId = selectedRole?.roleId || analysisResult?.targetRole?.roleId || 'software-developer';

  // Always compute live analysis from current extracted skills
  const liveAnalysis = calculateClientGapAnalysis(
    activeExtractedSkills,
    currentRoleId
  );

  const currentAnalysis = {
    ...(analysisResult || {}),
    ...liveAnalysis,
    targetRole: selectedRole || analysisResult?.targetRole || liveAnalysis.targetRole,
    candidateInfo: resumeData.candidateInfo || analysisResult?.candidateInfo,
    extractedSkills: activeExtractedSkills,
    resumeFileName: resumeData.fileName || 'Uploaded Resume',
    resumeFileSize: resumeData.fileSize || '1.2 MB',
    reportId: analysisResult?.reportId,
    createdAt: analysisResult?.createdAt,
  };

  // Step 1: Upload Complete Handler (Screen 4 -> Screen 5)
  const handleUploadComplete = (data) => {
    setAnalysisResult(null);
    setResumeData(data);
    showToast('Resume parsed! Please choose your target job role.', 'info');
    setCurrentView('dashboard-roles');
  };

  // Step 2: Role Selected Handler (Screen 5 -> Screen 6 / Run Analysis & Save to MongoDB)
  const handleRoleSelected = async (role) => {
    setSelectedRole(role);
    try {
      showToast(`Analyzing skill gap for ${role.title}...`, 'info');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        '/api/resume/analyze',
        {
          roleId: role.roleId,
          extractedSkills: resumeData.extractedSkills,
          candidateInfo: resumeData.candidateInfo,
          fileName: resumeData.fileName,
          fileSize: resumeData.fileSize,
          resumeText: resumeData.resumeText || '',
        },
        { headers }
      );

      if (res.data.success) {
        setAnalysisResult(res.data.data);
        if (res.data.data?.extractedSkills) {
          setResumeData((prev) => ({ ...prev, extractedSkills: res.data.data.extractedSkills }));
        }
        showToast('Analysis completed & saved to MongoDB!', 'success');

        // Confetti effect
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {}

        setCurrentView('dashboard-result');
      }
    } catch (err) {
      showToast('Error analyzing skill gap', 'error');
    }
  };

  // Load a saved report from MongoDB (Screen -> Result)
  const handleLoadReport = (report) => {
    setAnalysisResult(report);
    setResumeData({
      fileName: report.resumeFileName || 'Saved_Resume.pdf',
      fileSize: report.resumeFileSize || '1.2 MB',
      candidateInfo: report.candidateInfo,
      extractedSkills: report.extractedSkills,
    });
    setSelectedRole(report.targetRole);
    setCurrentView('dashboard-result');
    showToast(`Loaded report for ${report.candidateInfo?.name || 'Candidate'}`, 'info');
  };

  // Update skills in real-time and re-run gap analysis
  const handleUpdateSkillsAndAnalyze = async (newSkills) => {
    const updatedData = { ...resumeData, extractedSkills: newSkills };
    setResumeData(updatedData);

    const targetRoleId = selectedRole?.roleId || 'software-developer';
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.post(
        '/api/resume/analyze',
        {
          roleId: targetRoleId,
          extractedSkills: newSkills,
          candidateInfo: resumeData.candidateInfo,
          fileName: resumeData.fileName,
          fileSize: resumeData.fileSize,
          resumeText: resumeData.resumeText || '',
        },
        { headers }
      );
      if (res.data.success) {
        setAnalysisResult(res.data.data);
        if (res.data.data?.extractedSkills) {
          setResumeData((prev) => ({ ...prev, extractedSkills: res.data.data.extractedSkills }));
        }
      }
    } catch (err) {
      console.error('Error updating skills analysis:', err);
    }
  };

  const handleContinueToGapFromSkills = async () => {
    await handleUpdateSkillsAndAnalyze(resumeData.extractedSkills);
    setCurrentView('dashboard-gap');
  };

  // Screen Title & Step Number helper
  const getScreenBadge = () => {
    switch (currentView) {
      case 'dashboard-upload':
        return 'Screen 4: Resume Upload';
      case 'dashboard-roles':
        return 'Screen 5: Select Job Role';
      case 'dashboard-result':
        return 'Screen 6: Resume Analysis Result';
      case 'dashboard-skills':
        return 'Screen 7: Extracted Skills';
      case 'dashboard-gap':
        return 'Screen 8: Skill Gap Analysis';
      case 'dashboard-suggestions':
        return 'Screen 9: Suggestions & Roadmap';
      case 'dashboard-reports':
        return 'Saved Reports (MongoDB)';
      case 'dashboard-profile':
        return 'User Profile';
      default:
        return 'Dashboard Overview';
    }
  };

  // If in Dashboard View
  const isDashboardView = currentView.startsWith('dashboard');

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Body */}
      {isDashboardView ? (
        <div className="dashboard-layout">
          {/* Dark Navy Sidebar (Screens 4 - 9) */}
          <Sidebar activeTab={currentView} setActiveTab={setCurrentView} />

          {/* Main Dashboard Workspace */}
          <main className="dashboard-main">
            {/* Topbar with Screen Indicator */}
            <div className="dashboard-topbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.4rem',
                    border: '1px solid #bfdbfe',
                  }}
                >
                  {getScreenBadge()}
                </span>
                {analysisResult && (
                  <span style={{ fontSize: '0.88rem', color: '#64748b' }}>
                    Candidate: <b>{resumeData.candidateInfo?.name}</b> | Match:{' '}
                    <b style={{ color: '#10b981' }}>{currentAnalysis.matchScore}%</b>
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setCurrentView('dashboard-upload')}
                  className="btn-outline"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  Upload New
                </button>
              </div>
            </div>

            {/* Dashboard Sub-Views */}
            <div className="dashboard-content">
              {currentView === 'dashboard-overview' && (
                <OverviewView onNavigate={setCurrentView} latestReport={analysisResult} />
              )}

              {currentView === 'dashboard-upload' && (
                <UploadResumeView
                  onUploadComplete={handleUploadComplete}
                  currentData={resumeData}
                />
              )}

              {currentView === 'dashboard-roles' && (
                <SelectJobRoleView
                  initialRoleId={selectedRole?.roleId}
                  onRoleSelected={handleRoleSelected}
                />
              )}

              {currentView === 'dashboard-result' && (
                <ResumeResultView
                  analysisData={currentAnalysis}
                  onNavigateToSkills={() => setCurrentView('dashboard-skills')}
                  onNavigateToGap={() => setCurrentView('dashboard-gap')}
                  onNavigateToSuggestions={() => setCurrentView('dashboard-suggestions')}
                />
              )}

              {currentView === 'dashboard-skills' && (
                <ExtractedSkillsView
                  extractedSkills={currentAnalysis.extractedSkills || resumeData.extractedSkills}
                  onUpdateSkills={handleUpdateSkillsAndAnalyze}
                  onContinueToGap={handleContinueToGapFromSkills}
                />
              )}

              {currentView === 'dashboard-gap' && (
                <SkillGapAnalysisView
                  analysisData={currentAnalysis}
                  onUpdateSkills={handleUpdateSkillsAndAnalyze}
                  onContinueToSuggestions={() => setCurrentView('dashboard-suggestions')}
                />
              )}

              {currentView === 'dashboard-suggestions' && (
                <SuggestionsView
                  analysisData={currentAnalysis}
                  recommendations={currentAnalysis.recommendations}
                  roadmap={currentAnalysis.roadmap}
                />
              )}

              {currentView === 'dashboard-reports' && (
                <MyReportsView
                  onLoadReport={handleLoadReport}
                  onStartNewUpload={() => setCurrentView('dashboard-upload')}
                />
              )}

              {currentView === 'dashboard-profile' && <ProfileView />}
            </div>
          </main>
        </div>
      ) : (
        /* Public Marketing & Auth Views */
        <main style={{ flex: 1 }}>
          {currentView === 'home' && (
            <HomeView
              onGetStarted={() => setCurrentView(user ? 'dashboard-upload' : 'register')}
              onLogin={() => setCurrentView('login')}
            />
          )}

          {currentView === 'about' && (
            <AboutView onGetStarted={() => setCurrentView(user ? 'dashboard-upload' : 'register')} />
          )}

          {currentView === 'features' && (
            <FeaturesView onGetStarted={() => setCurrentView(user ? 'dashboard-upload' : 'register')} />
          )}

          {currentView === 'register' && (
            <RegisterView
              onLoginClick={() => setCurrentView('login')}
              onRegisterSuccess={() => setCurrentView('dashboard-upload')}
            />
          )}

          {currentView === 'login' && (
            <LoginView
              onSignUpClick={() => setCurrentView('register')}
              onLoginSuccess={() => setCurrentView('dashboard-upload')}
            />
          )}
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
