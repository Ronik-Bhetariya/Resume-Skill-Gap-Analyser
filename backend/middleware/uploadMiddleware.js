const multer = require('multer');
const path = require('path');

// Store file in memory buffer for immediate parsing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.doc', '.docx', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext) || file.mimetype.includes('word') || file.mimetype.includes('text') || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/msword') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Please upload a DOCX, DOC, or TXT file (Word / Text document), or use Paste Resume Text.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter,
});

module.exports = upload;
