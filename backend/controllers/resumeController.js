const path = require('path');
const { pathToFileURL } = require('url');
const zlib = require('zlib');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');
const Report = require('../models/Report');
const {
  extractCandidateInfo,
  extractSkillsFromText,
  analyzeSkillGap,
  mergeSkillSets,
} = require('../services/skillEngine');

// Properly configure PDF.js worker path for Windows & Cross-Platform compatibility
try {
  const workerPath = path.resolve(__dirname, '../node_modules/pdf-parse/dist/pdf-parse/cjs/pdf.worker.mjs');
  PDFParse.setWorker(pathToFileURL(workerPath).href);
} catch (e) {
  console.warn('PDF worker configuration notice:', e.message);
}

// Sample resumes for 1-click testing
const SAMPLE_RESUMES = {
  'software-developer': {
    title: 'Software Developer (Ronik Bhetariya)',
    text: `RONIK BHETARIYA
ronik@example.com | +91 98765 43210 | Ahmedabad, India
LinkedIn: linkedin.com/in/ronik-bhetariya | GitHub: github.com/ronik

PROFESSIONAL SUMMARY
Motivated Software Developer with 2+ years of experience building responsive web applications, backend APIs, and microservices. Skilled in modern JavaScript frameworks, databases, and fullstack application lifecycle.

EDUCATION
B.E. Information Technology (Graduated 2024 with 8.6 CGPA)

TECHNICAL SKILLS
- Programming Languages: JavaScript, HTML, CSS, Python, Java, SQL
- Frameworks & Libraries: React, React.js, Express.js, Node.js, Tailwind CSS
- Databases: MongoDB, MySQL
- Tools & Platforms: Git, GitHub, VS Code, Postman, Linux, Figma

PROJECTS
1. E-Commerce Platform
- Developed responsive React frontend with state management.
- Built REST APIs in Express.js and stored data in MongoDB.
- Integrated Postman for API testing and Git for version control.

2. Inventory Management Dashboard
- Built using Python, SQL database, and HTML/CSS UI.
- Implemented real-time analytics and user role permissions.

SOFT SKILLS
- Teamwork, Communication, Problem Solving, Time Management
`,
  },
  'data-analyst': {
    title: 'Data Analyst (Priya Sharma)',
    text: `PRIYA SHARMA
priya.sharma@example.com | +91 91234 56789 | Mumbai, India
EDUCATION: B.Tech in Computer Science
EXPERIENCE: 1.5 Years of Experience as Data Analyst

TECHNICAL SKILLS:
- Python, SQL, PostgreSQL, Pandas, NumPy, Excel
- Data Analysis, Data Visualization, Tableau, Power BI, Statistics
- Git, VS Code, Jupyter Notebook

PROJECTS:
- Customer Churn Analysis using Python Pandas and Tableau dashboards.
- Sales Forecasting model with SQL relational queries and NumPy.

SOFT SKILLS:
- Analytical Skills, Critical Thinking, Attention to Detail, Communication
`,
  },
  'web-developer': {
    title: 'Frontend / Web Developer (Aman Patel)',
    text: `AMAN PATEL
aman.patel@example.com | +91 99887 76655 | Pune, India
EDUCATION: B.E. Computer Engineering
EXPERIENCE: 2 Years Experience

TECHNICAL SKILLS:
- HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap
- Node.js, Express.js, MongoDB, REST API, Git, GitHub, Postman, Figma, Chrome DevTools

SOFT SKILLS:
- Problem Solving, Creativity, Collaboration, Adaptability
`,
  },
  'ai-ml-engineer': {
    title: 'AI / ML Engineer (Karan Mehta)',
    text: `KARAN MEHTA
karan.mehta@example.com | +91 98111 22334 | Bangalore, India
EDUCATION: M.Tech in Data Science & AI
EXPERIENCE: 2 Years Experience

TECHNICAL SKILLS:
- Python, Machine Learning, Deep Learning, PyTorch, TensorFlow, Scikit-Learn
- Pandas, NumPy, NLP, Data Analysis, SQL, Docker, AWS Cloud, Git

SOFT SKILLS:
- Problem Solving, Research, Critical Thinking, Teamwork
`,
  },
};

function looksLikeResumeText(text) {
  if (!text || typeof text !== 'string') return false;
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length < 40) return false;
  if (/\/(Type|Font|Encoding|Length|Filter|FlateDecode|ExtGState)\b/.test(cleaned)) return false;
  const letters = (cleaned.match(/[A-Za-z]/g) || []).length;
  return letters / cleaned.length >= 0.45;
}

function sanitizeResumeText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\u0000/g, ' ')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, ' ')
    .replace(/\b(?:[A-Za-z]\s+){1,}[A-Za-z]\b/g, (match) => {
      const parts = match.trim().split(/\s+/);
      if (parts.length >= 2 && parts.every((part) => part.length === 1)) return parts.join('');
      return match;
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Fallback stream parser to extract text directly from PDF binary streams
 */
function extractRawPdfTextFallback(buffer) {
  try {
    let fullText = '';
    const content = buffer.toString('binary');
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match;

    while ((match = streamRegex.exec(content)) !== null) {
      const rawStream = match[1];
      let streamData = rawStream;
      try {
        const streamBuf = Buffer.from(rawStream, 'binary');
        streamData = zlib.inflateSync(streamBuf).toString('utf-8');
      } catch (e) {
        // Not compressed or already plain text
      }

      if (/\/(Font|Encoding|CIDSystemInfo|ToUnicode|Width)/.test(streamData)) {
        continue;
      }

      const tjMatches = streamData.match(/\(([^)]+)\)\s*Tj/g);
      if (tjMatches) {
        tjMatches.forEach((tj) => {
          const t = tj.replace(/^\(/, '').replace(/\)\s*Tj$/, '');
          if (/[A-Za-z]{2,}/.test(t)) fullText += t + ' ';
        });
      }

      const tjArrMatches = streamData.match(/\[([^\]]+)\]\s*TJ/gi);
      if (tjArrMatches) {
        tjArrMatches.forEach((arr) => {
          const parts = arr.match(/\(([^)]+)\)/g);
          if (parts) {
            parts.forEach((p) => {
              const t = p.replace(/[()]/g, '');
              if (/[A-Za-z]{2,}/.test(t)) fullText += t + ' ';
            });
          }
        });
      }
    }

    const sanitized = sanitizeResumeText(fullText);
    return looksLikeResumeText(sanitized) ? sanitized : '';
  } catch (e) {
    return '';
  }
}

/**
 * Helper to extract plain text from uploaded file buffer (PDF, DOCX, DOC, TXT)
 */
async function extractTextFromFile(file) {
  if (!file || !file.buffer) return '';
  const ext = file.originalname ? file.originalname.split('.').pop().toLowerCase() : '';

  try {
    // 1. PDF File Format
    if (ext === 'pdf' || (file.mimetype && file.mimetype.includes('pdf'))) {
      let extractedText = '';

      try {
        const parser = new PDFParse({ data: file.buffer });
        try {
          const result = await parser.getText();
          if (result && result.text && result.text.trim()) {
            extractedText = result.text;
          }
        } finally {
          if (parser && typeof parser.destroy === 'function') {
            await parser.destroy();
          }
        }
      } catch (pdfErr) {
        console.warn('PDFParse primary parser notice:', pdfErr.message);
      }

      // If PDFParse did not yield text, use stream fallback
      if (!extractedText || !extractedText.trim()) {
        extractedText = extractRawPdfTextFallback(file.buffer);
      }

      const sanitized = sanitizeResumeText(extractedText);
      if (looksLikeResumeText(sanitized)) {
        return sanitized;
      }
    }
    // 2. Word (.docx / .doc) Format
    else if (ext === 'docx' || ext === 'doc' || (file.mimetype && file.mimetype.includes('word'))) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      if (result && result.value && result.value.trim()) {
        return result.value.trim();
      }
    }
    // 3. Plain Text Format
    else if (ext === 'txt' || (file.mimetype && file.mimetype.includes('text'))) {
      const rawText = file.buffer.toString('utf-8');
      if (!rawText.startsWith('%PDF') && !rawText.startsWith('PK\x03\x04')) {
        return rawText.trim();
      }
    }
  } catch (err) {
    console.error('Text extraction error from file:', err);
  }

  // Safe check for plain text without standard extension
  try {
    const candidate = file.buffer.toString('utf-8');
    if (
      !candidate.startsWith('%PDF') &&
      !candidate.startsWith('PK\x03\x04') &&
      /^[\x20-\x7E\s\u00A0-\uFFFF]*$/.test(candidate.slice(0, 300))
    ) {
      return candidate.trim();
    }
  } catch (e) {}

  // Never return raw binary buffer for PDF or DOCX
  return '';
}

/**
 * @desc Upload resume and extract skills + candidate details (Screens 4 & 7)
 * @route POST /api/resume/upload
 */
const uploadResume = async (req, res) => {
  try {
    let resumeText = '';
    let fileName = 'Sample_Resume.pdf';
    let fileSize = '1.2 MB';

    if (req.file) {
      fileName = req.file.originalname;
      fileSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
      const clientText = sanitizeResumeText(req.body.resumeText || '');
      const fileText = sanitizeResumeText(await extractTextFromFile(req.file));

      if (looksLikeResumeText(clientText)) {
        resumeText = clientText;
      } else if (looksLikeResumeText(fileText)) {
        resumeText = fileText;
      } else {
        return res.status(400).json({
          success: false,
          message: 'Could not extract readable text from the uploaded PDF. Please use a text-based PDF (not a scanned image), DOCX, or TXT file.',
        });
      }
    } else if (req.body.resumeText && req.body.resumeText.trim()) {
      resumeText = sanitizeResumeText(req.body.resumeText);
      fileName = req.body.fileName || 'Pasted_Resume.txt';
      fileSize = `${(Buffer.byteLength(resumeText, 'utf8') / 1024).toFixed(1)} KB`;
    } else if (req.body.sampleKey && SAMPLE_RESUMES[req.body.sampleKey]) {
      const sample = SAMPLE_RESUMES[req.body.sampleKey];
      resumeText = sample.text;
      fileName = `${sample.title}.pdf`;
      fileSize = '1.1 MB';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file, paste resume text, or choose a sample resume.',
      });
    }

    const candidateInfo = extractCandidateInfo(resumeText);
    const extractedSkills = extractSkillsFromText(resumeText);

    return res.status(200).json({
      success: true,
      message: 'Resume parsed and skills extracted successfully!',
      data: {
        fileName,
        fileSize,
        candidateInfo,
        extractedSkills,
        resumeText,
        rawTextSnippet: resumeText.substring(0, 500) + '...',
      },
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error parsing resume file',
    });
  }
};

/**
 * @desc Analyze skill gap against chosen Job Role and save report to MongoDB (Screens 5, 6, 8, 9)
 * @route POST /api/resume/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    const {
      roleId = 'software-developer',
      extractedSkills,
      candidateInfo,
      fileName = 'Ronik_Resume.pdf',
      fileSize = '1.2 MB',
      resumeText = '',
    } = req.body;

    if (!extractedSkills && !resumeText) {
      return res.status(400).json({ success: false, message: 'Extracted skills are required' });
    }

    // Prioritize clean extractedSkills from request
    let skillsForAnalysis = extractedSkills;
    const hasSkills = skillsForAnalysis && (
      (Array.isArray(skillsForAnalysis.technical) && skillsForAnalysis.technical.length > 0) ||
      (Array.isArray(skillsForAnalysis.tools) && skillsForAnalysis.tools.length > 0) ||
      (Array.isArray(skillsForAnalysis.soft) && skillsForAnalysis.soft.length > 0)
    );

    if (!hasSkills && resumeText && String(resumeText).trim()) {
      skillsForAnalysis = extractSkillsFromText(resumeText);
    }

    // Run skill gap analysis engine
    const analysisResult = analyzeSkillGap(skillsForAnalysis, roleId);

    // Save report directly to MongoDB
    const reportData = {
      userId: req.user ? req.user._id : null,
      candidateInfo: candidateInfo || {
        name: 'Candidate',
        email: 'Not found',
        phone: 'Not found',
        experience: 'Not specified',
        education: 'Not specified',
      },
      resumeFileName: fileName,
      resumeFileSize: fileSize,
      targetRole: analysisResult.targetRole,
      matchScore: analysisResult.matchScore,
      summaryStats: analysisResult.summaryStats,
      extractedSkills: skillsForAnalysis,
      skillComparison: analysisResult.skillComparison,
      recommendations: analysisResult.recommendations,
      roadmap: analysisResult.roadmap,
    };

    const savedReport = await Report.create(reportData);
    console.log(`📊 Report saved to MongoDB with ID: ${savedReport._id}`);

    return res.status(200).json({
      success: true,
      message: 'Skill gap analysis completed and saved successfully!',
      reportId: savedReport._id,
      data: {
        ...analysisResult,
        extractedSkills: skillsForAnalysis,
        candidateInfo: reportData.candidateInfo,
        resumeFileName: fileName,
        resumeFileSize: fileSize,
        reportId: savedReport._id,
        createdAt: savedReport.createdAt,
      },
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error analyzing resume skill gap',
    });
  }
};

/**
 * @desc Get all saved reports from MongoDB for current user or all reports
 * @route GET /api/resume/reports
 */
const getReports = async (req, res) => {
  try {
    const filter = req.user ? { userId: req.user._id } : {};
    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .limit(30)
      .select('-__v');

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching reports' });
  }
};

/**
 * @desc Get a single report by ID from MongoDB
 * @route GET /api/resume/reports/:id
 */
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    return res.status(200).json({ success: true, report });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching report' });
  }
};

/**
 * @desc Delete a report by ID from MongoDB
 * @route DELETE /api/resume/reports/:id
 */
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    return res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting report' });
  }
};

/**
 * @desc Get Sample Resumes list
 * @route GET /api/resume/samples
 */
const getSampleResumes = (req, res) => {
  return res.status(200).json({
    success: true,
    samples: Object.entries(SAMPLE_RESUMES).map(([key, item]) => ({
      key,
      title: item.title,
    })),
  });
};

module.exports = {
  uploadResume,
  analyzeResume,
  getReports,
  getReportById,
  deleteReport,
  getSampleResumes,
};
