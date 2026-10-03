// Comprehensive Frontend Skill Matcher & Equivalence Engine

export const DEFAULT_JOB_ROLES = [
  {
    roleId: 'web-developer',
    title: 'Web Developer',
    category: 'Frontend & Fullstack',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    desirableSkills: ['TypeScript', 'Next.js', 'REST API', 'Git', 'Redux', 'Bootstrap'],
    salaryRange: '₹4,00,000 - ₹8,50,000 / yr (4 - 8.5 LPA)',
  },
  {
    roleId: 'software-developer',
    title: 'Software Developer',
    category: 'Engineering',
    requiredSkills: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'Python', 'Git'],
    desirableSkills: ['Java', 'Docker', 'REST API', 'TypeScript', 'Linux', 'AWS Cloud', 'PostgreSQL', 'CI/CD'],
    salaryRange: '₹5,00,000 - ₹12,00,000 / yr (5 - 12 LPA)',
  },
  {
    roleId: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Pandas', 'NumPy', 'Tableau', 'Power BI'],
    desirableSkills: ['R', 'Machine Learning', 'Big Data', 'Excel', 'PostgreSQL', 'Git'],
    salaryRange: '₹4,50,000 - ₹9,00,000 / yr (4.5 - 9 LPA)',
  },
  {
    roleId: 'mobile-app-developer',
    title: 'Mobile App Developer',
    category: 'Mobile',
    requiredSkills: ['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'Dart', 'REST API', 'Git'],
    desirableSkills: ['iOS Development', 'Android Development', 'Firebase', 'Redux', 'UI/UX Design'],
    salaryRange: '₹4,50,000 - ₹10,00,000 / yr (4.5 - 10 LPA)',
  },
  {
    roleId: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    category: 'Artificial Intelligence',
    requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy', 'NLP'],
    desirableSkills: ['Scikit-Learn', 'Docker', 'AWS Cloud', 'SQL', 'LLMs', 'Computer Vision'],
    salaryRange: '₹6,00,000 - ₹12,00,000 / yr (6 - 12 LPA)',
  },
  {
    roleId: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    requiredSkills: ['AWS Cloud', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Terraform', 'Python'],
    desirableSkills: ['Azure', 'Google Cloud', 'Jenkins', 'GitHub Actions', 'Network Security', 'SQL'],
    salaryRange: '₹5,50,000 - ₹11,50,000 / yr (5.5 - 11.5 LPA)',
  },
];

export const SKILL_ALIASES = {
  // Web & Frontend
  'html': 'HTML',
  'html5': 'HTML',
  'html 5': 'HTML',
  'hypertext markup language': 'HTML',
  'html/css': 'HTML',
  'html & css': 'HTML',
  'css': 'CSS',
  'css3': 'CSS',
  'css 3': 'CSS',
  'cascading style sheets': 'CSS',
  'cascading stylesheet': 'CSS',
  'cascading style sheet': 'CSS',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'tailwind css': 'Tailwind CSS',
  'tailwind-css': 'Tailwind CSS',
  'bootstrap': 'Bootstrap',
  'bootstrap 5': 'Bootstrap',
  'bootstrap4': 'Bootstrap',
  'sass': 'Sass',
  'scss': 'Sass',
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'es6': 'JavaScript',
  'es6+': 'JavaScript',
  'es2015': 'JavaScript',
  'vanillajs': 'JavaScript',
  'vanilla js': 'JavaScript',
  'vanilla javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'type-script': 'TypeScript',
  'ts-node': 'TypeScript',
  'tsc': 'TypeScript',
  'react': 'React',
  'reactjs': 'React',
  'react.js': 'React',
  'react js': 'React',
  'react 18': 'React',
  'react 19': 'React',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'next js': 'Next.js',
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',
  'vue.js': 'Vue.js',
  'angular': 'Angular',
  'angularjs': 'Angular',
  'redux': 'Redux',
  'redux toolkit': 'Redux',
  'zustand': 'Zustand',

  // Backend & APIs
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'node js': 'Node.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'express.js': 'Express.js',
  'express js': 'Express.js',
  'nestjs': 'NestJS',
  'django': 'Django',
  'flask': 'Flask',
  'fastapi': 'FastAPI',
  'spring': 'Spring Boot',
  'spring boot': 'Spring Boot',
  'springboot': 'Spring Boot',
  'rest': 'REST API',
  'rest api': 'REST API',
  'rest apis': 'REST API',
  'restful': 'REST API',
  'restful api': 'REST API',
  'restful apis': 'REST API',
  'apis': 'REST API',
  'graphql': 'GraphQL',

  // Databases
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'mongo db': 'MongoDB',
  'mongodb atlas': 'MongoDB',
  'mongo atlas': 'MongoDB',
  'mongoose': 'MongoDB',
  'mongoosejs': 'MongoDB',
  'nosql': 'MongoDB',
  'no sql': 'MongoDB',
  'no-sql': 'MongoDB',
  'sql': 'SQL',
  'mysql': 'MySQL',
  'my-sql': 'MySQL',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'psql': 'PostgreSQL',
  'pgsql': 'PostgreSQL',
  'sqlite': 'SQLite',
  'redis': 'Redis',
  'firebase': 'Firebase',
  'supabase': 'Supabase',
  'oracle': 'Oracle',

  // Programming Languages
  'python': 'Python',
  'python3': 'Python',
  'python 3': 'Python',
  'java': 'Java',
  'core java': 'Java',
  'cpp': 'C++',
  'c++': 'C++',
  'c#': 'C#',
  'csharp': 'C#',
  'c-sharp': 'C#',
  'c programming': 'C',
  'c language': 'C',
  'golang': 'Go',
  'go programming': 'Go',
  'go language': 'Go',
  'rust': 'Rust',
  'php': 'PHP',
  'ruby': 'Ruby',
  'dart': 'Dart',

  // Tools & Version Control
  'git': 'Git',
  'github': 'Git',
  'gitlab': 'Git',
  'bitbucket': 'Git',
  'version control': 'Git',
  'postman': 'Postman',
  'vscode': 'VS Code',
  'vs code': 'VS Code',
  'visual studio code': 'VS Code',
  'figma': 'Figma',
  'jira': 'JIRA',
  'linux': 'Linux',

  // Cloud & DevOps
  'docker': 'Docker',
  'docker compose': 'Docker',
  'k8s': 'Kubernetes',
  'kubernetes': 'Kubernetes',
  'aws': 'AWS Cloud',
  'aws cloud': 'AWS Cloud',
  'amazon web services': 'AWS Cloud',
  'amazon aws': 'AWS Cloud',
  'gcp': 'Google Cloud',
  'google cloud': 'Google Cloud',
  'azure': 'Azure',
  'ci/cd': 'CI/CD',
  'ci / cd': 'CI/CD',
  'cicd': 'CI/CD',
  'jenkins': 'CI/CD',
  'github actions': 'CI/CD',
  'terraform': 'Terraform',

  // Mobile
  'flutter': 'Flutter',
  'react native': 'React Native',
  'react-native': 'React Native',

  // AI & Data
  'machine learning': 'Machine Learning',
  'ai / ml': 'Machine Learning',
  'ai/ml': 'Machine Learning',
  'deep learning': 'Deep Learning',
  'neural networks': 'Deep Learning',
  'nlp': 'NLP',
  'natural language processing': 'NLP',
  'tensorflow': 'TensorFlow',
  'pytorch': 'PyTorch',
  'scikit-learn': 'Scikit-Learn',
  'sklearn': 'Scikit-Learn',
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'data analysis': 'Data Analysis',
  'data analytics': 'Data Analysis',
  'tableau': 'Tableau',
  'power bi': 'Power BI',
  'powerbi': 'Power BI',

  // Soft Skills
  'communication': 'Communication',
  'teamwork': 'Teamwork',
  'problem solving': 'Problem Solving',
  'time management': 'Time Management',
  'leadership': 'Leadership',
  'critical thinking': 'Critical Thinking',
  'adaptability': 'Adaptability',
  'analytical skills': 'Analytical Skills',
  'collaboration': 'Collaboration',
  'creativity': 'Creativity',
};

export function canonicalizeSkillName(skill) {
  if (!skill) return '';
  const raw = String(skill).trim();
  const lower = raw.toLowerCase();
  const clean = lower.replace(/[^a-z0-9+#]/g, '');
  return SKILL_ALIASES[lower] || SKILL_ALIASES[clean] || raw;
}

/**
 * Robust skill equivalence and synonym matcher
 */
export function isSkillEquivalent(userSkill, targetSkill) {
  if (!userSkill || !targetSkill) return false;

  const uRaw = String(userSkill).trim();
  const tRaw = String(targetSkill).trim();
  const u = uRaw.toLowerCase();
  const t = tRaw.toLowerCase();

  // 1. Exact string or case-insensitive match
  if (u === t) return true;

  // 2. Clean alphanumeric match (ignoring spaces, dots, hyphens, slashes)
  const uClean = u.replace(/[^a-z0-9+#]/g, '');
  const tClean = t.replace(/[^a-z0-9+#]/g, '');
  if (uClean === tClean && uClean.length > 0) return true;

  // 3. Canonical alias match
  const uCanonical = canonicalizeSkillName(uRaw);
  const tCanonical = canonicalizeSkillName(tRaw);
  if (
    uCanonical &&
    tCanonical &&
    uCanonical.toLowerCase() === tCanonical.toLowerCase()
  ) {
    return true;
  }

  // 4. Technology equivalence groups
  const equivalenceGroups = [
    ['html', 'html5', 'html 5', 'hypertext markup language'],
    ['css', 'css3', 'css 3', 'cascading style sheets', 'cascading stylesheet'],
    ['tailwind css', 'tailwind', 'tailwindcss', 'tailwind-css'],
    ['bootstrap', 'bootstrap 5', 'bootstrap4'],
    ['javascript', 'js', 'es6', 'es6+', 'vanillajs', 'vanilla js'],
    ['typescript', 'ts'],
    ['react', 'reactjs', 'react.js', 'react js', 'react 18', 'react 19'],
    ['next.js', 'nextjs', 'next js'],
    ['node', 'node.js', 'nodejs', 'node js'],
    ['express', 'express.js', 'expressjs', 'express js'],
    ['mongodb', 'mongo', 'mongo db', 'mongodb atlas', 'mongoose', 'mongoosejs', 'nosql', 'no sql', 'no-sql'],
    ['sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'oracle', 'sql server', 'mariadb', 'relational database', 'rdbms'],
    ['postgresql', 'postgres', 'psql', 'pgsql'],
    ['mysql', 'my-sql'],
    ['python', 'python3', 'python 3', 'py'],
    ['java', 'core java'],
    ['c++', 'cpp'],
    ['c#', 'csharp', 'c-sharp'],
    ['golang', 'go', 'go programming', 'go language'],
    ['rust'],
    ['flutter', 'dart'],
    ['react native', 'react-native'],
    ['aws cloud', 'aws', 'amazon web services', 'amazon aws'],
    ['google cloud', 'gcp', 'google cloud platform'],
    ['azure', 'microsoft azure'],
    ['docker', 'docker compose', 'containerization', 'containers'],
    ['kubernetes', 'k8s', 'kubectl'],
    ['git', 'github', 'gitlab', 'bitbucket', 'version control'],
    ['rest api', 'rest', 'restful', 'restful apis', 'rest apis', 'restful api', 'apis', 'web services'],
    ['ci/cd', 'ci / cd', 'cicd', 'jenkins', 'github actions'],
    ['machine learning', 'ml', 'ai / ml', 'ai/ml', 'scikit-learn', 'sklearn'],
    ['deep learning', 'dl', 'neural networks'],
    ['pytorch', 'torch'],
    ['tensorflow', 'tf', 'keras'],
    ['data analysis', 'data analytics', 'data mining', 'eda'],
    ['tableau', 'power bi', 'powerbi']
  ];

  for (const group of equivalenceGroups) {
    const cleanGroup = group.map((g) => g.replace(/[^a-z0-9+#]/g, ''));
    const hasU = cleanGroup.includes(uClean) || group.includes(u) || (uCanonical && group.includes(uCanonical.toLowerCase()));
    const hasT = cleanGroup.includes(tClean) || group.includes(t) || (tCanonical && group.includes(tCanonical.toLowerCase()));
    if (hasU && hasT) return true;
  }

  return false;
}

/**
 * Universal extractor: flattens any input (array of strings/objects, categorized object with arbitrary keys, delimited string)
 */
export function extractFlatUserSkills(input) {
  const result = [];
  const seen = new Set();

  const addSkillToken = (token) => {
    if (!token) return;
    const cleaned = token
      .replace(/\([^)]*\)/g, '')
      .replace(/[[\]{}]/g, '')
      .replace(/^[•·●◦▪▸►*+\-\s]+/, '')
      .replace(/[•·●◦▪▸►*+\-\s]+$/, '')
      .trim();

    if (!cleaned) return;
    if (
      /^(skills|technical\s+skills|soft\s+skills|core\s+skills|key\s+skills|technical|tools|soft|other|languages|programming\s+languages|frameworks|databases|cloud|libraries|proficiencies|summary|experience|education)$/i.test(
        cleaned
      )
    ) {
      return;
    }

    const canonical = canonicalizeSkillName(cleaned);
    if (canonical) {
      const lower = canonical.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        result.push(canonical);
      }
    }
  };

  const processVal = (val) => {
    if (val == null || val === '') return;

    if (typeof val === 'string') {
      const parts = val.split(/[\n\r,:|/•·●◦▪▸►;–—]+/);
      parts.forEach(addSkillToken);
      return;
    }

    if (Array.isArray(val)) {
      val.forEach(processVal);
      return;
    }

    if (typeof val === 'object') {
      if (val.skill) processVal(val.skill);
      else if (val.name) processVal(val.name);
      else if (val.title) processVal(val.title);
      else {
        Object.values(val).forEach(processVal);
      }
    }
  };

  processVal(input);
  return result;
}

/**
 * Categorize flat skill array into standard 4 categories
 */
export function categorizeSkills(skillList) {
  const flat = extractFlatUserSkills(skillList);
  const technical = new Set();
  const soft = new Set();
  const tools = new Set();
  const cloudAndDb = new Set();

  const softList = new Set([
    'communication', 'teamwork', 'problem solving', 'time management', 'critical thinking',
    'adaptability', 'leadership', 'collaboration', 'analytical skills', 'creativity',
    'agile mindset', 'work ethic', 'attention to detail', 'conflict resolution', 'presentation skills'
  ]);
  const toolList = new Set([
    'git', 'github', 'gitlab', 'bitbucket', 'vs code', 'vscode', 'postman', 'figma', 'jira',
    'confluence', 'trello', 'slack', 'notion', 'swagger', 'npm', 'yarn', 'vite', 'webpack', 'docker', 'linux'
  ]);
  const dbList = new Set([
    'mongodb', 'postgresql', 'postgres', 'mysql', 'redis', 'sqlite', 'oracle', 'cassandra', 'dynamodb',
    'firebase', 'supabase', 'aws cloud', 'aws', 'azure', 'google cloud', 'gcp', 'kubernetes', 'docker'
  ]);

  flat.forEach((skill) => {
    const canonical = canonicalizeSkillName(skill);
    if (!canonical) return;
    const lower = canonical.toLowerCase();
    if (softList.has(lower)) {
      soft.add(canonical);
    } else if (toolList.has(lower)) {
      tools.add(canonical);
      technical.add(canonical);
    } else if (dbList.has(lower)) {
      cloudAndDb.add(canonical);
      technical.add(canonical);
    } else {
      technical.add(canonical);
    }
  });

  return {
    technical: Array.from(technical),
    soft: Array.from(soft),
    tools: Array.from(tools),
    cloudAndDb: Array.from(cloudAndDb),
  };
}

export function mergeSkillSets(base = {}, extra = {}) {
  const flatBase = extractFlatUserSkills(base);
  const flatExtra = extractFlatUserSkills(extra);
  const combined = Array.from(new Set([...flatBase, ...flatExtra]));
  return categorizeSkills(combined);
}

function resumeContainsAlias(lowerText, alias) {
  const clean = String(alias).toLowerCase().trim();
  if (!clean) return false;

  if (clean === 'c') {
    return /(^|[^a-z0-9+#])c(?=\s*(\+\+|\/|,|\||•|$))/i.test(lowerText);
  }
  if (clean === 'go') {
    return /(^|[^a-z0-9+#])go(?:lang| language| programming)(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (clean === 'rest' || clean === 'api' || clean === 'apis') {
    return /(^|[^a-z0-9+#])rest(?:ful)?\s*apis?(?=[^a-z0-9+#]|$)/i.test(lowerText)
      || /(^|[^a-z0-9+#])restful(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (clean === 'express') {
    return /(^|[^a-z0-9+#])express(?:\.js|js|\s+js)(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (clean === 'next') {
    return /(^|[^a-z0-9+#])next(?:\.js|js|\s+js)(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (clean === 'java') {
    return /(^|[^a-z0-9+#])java(?!script)(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (clean === 'git') {
    return /(^|[^a-z0-9+#])git(?![a-z])(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (clean === 'spring') {
    return /(^|[^a-z0-9+#])spring(?:\s*boot)?(?=[^a-z0-9+#]|$)/i.test(lowerText);
  }
  if (['r', 'ai', 'ml', 'dl', 'tf', 'ts', 'py', 'native'].includes(clean)) {
    return false;
  }

  const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  const regex = new RegExp(`(^|[^a-zA-Z0-9+#])${escaped}(?=[^a-zA-Z0-9+#]|$)`, 'i');
  return regex.test(lowerText);
}

export function extractSkillsFromResumeText(text) {
  if (!text || typeof text !== 'string') {
    return { technical: [], soft: [], tools: [], cloudAndDb: [] };
  }

  let normalized = String(text)
    .normalize('NFKC')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ' ')
    .replace(/[\u00A0\u1680\u2000-\u200D\u202F\u205F\u3000\uFEFF]/g, ' ')
    .replace(/[•·●◦▪▸►★☆✓✔✕✖·]/g, ' ')
    .replace(/[|/\\,;:()[\]{}<>]/g, ' ');

  normalized = normalized.replace(/\b(?:[A-Za-z]\s+){1,}[A-Za-z]\b/g, (match) => {
    const parts = match.trim().split(/\s+/);
    if (parts.length >= 2 && parts.every((p) => p.length === 1)) return parts.join('');
    return match;
  });

  const lowerText = ` ${normalized.replace(/[\n\r\t]+/g, ' ').replace(/\s+/g, ' ')} `.toLowerCase();
  const extracted = new Set();

  Object.entries(SKILL_ALIASES)
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([alias, canonical]) => {
      if (resumeContainsAlias(lowerText, alias)) {
        extracted.add(canonicalizeSkillName(canonical));
      }
    });

  if (/\bmern(\s*stack)?\b/i.test(lowerText)) {
    ['MongoDB', 'Express.js', 'React', 'Node.js'].forEach((s) => extracted.add(canonicalizeSkillName(s)));
  }

  return categorizeSkills(Array.from(extracted));
}

// Rich curated learning resource base for skills
export const SKILL_RESOURCES = {
  'HTML': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    description: 'HyperText Markup Language standard for structuring web pages and semantic content.',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    resources: [
      { title: 'MDN Web Docs: HTML Foundations', type: 'documentation', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      { title: 'FreeCodeCamp Responsive Web Design', type: 'course', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
    ],
    actionSteps: [
      'Master semantic HTML5 elements (header, nav, main, section, article, footer)',
      'Understand accessible forms, input validation, and aria attributes',
      'Implement SEO tags and OpenGraph meta data',
    ],
  },
  'CSS': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
    description: 'Cascading Style Sheets for modern responsive design, Flexbox, Grid, and animations.',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1 - 2 Weeks',
    resources: [
      { title: 'MDN Web Docs: CSS Reference', type: 'documentation', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS' },
      { title: 'CSS Flexbox & Grid Interactive Guide', type: 'practice', url: 'https://flexboxfroggy.com/' },
    ],
    actionSteps: [
      'Master CSS Flexbox, Grid layout systems, and media queries',
      'Use CSS variables for theme switching (light/dark mode)',
      'Build smooth micro-interactions and transitions',
    ],
  },
  'MongoDB': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    description: 'MongoDB is a popular NoSQL database used for scalable, document-oriented applications.',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1 - 2 Weeks',
    resources: [
      { title: 'MongoDB University Free Certification', type: 'course', url: 'https://learn.mongodb.com/' },
      { title: 'Mongoose ODM Documentation', type: 'documentation', url: 'https://mongoosejs.com/docs/' },
      { title: 'MongoDB Crash Course (FreeCodeCamp)', type: 'video', url: 'https://www.youtube.com/watch?v=c2M-rlkkT5o' },
    ],
    actionSteps: [
      'Learn Document schema design, indexing, and aggregation pipelines',
      'Connect Node.js using Mongoose ODM with validation schemas',
      'Practice CRUD operations and relational indexing',
    ],
  },
  'React': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    description: 'React is a component-driven UI library for building dynamic single-page web applications.',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '2 - 3 Weeks',
    resources: [
      { title: 'React.dev Official Interactive Tutorial', type: 'documentation', url: 'https://react.dev/' },
      { title: 'React 19 Full Course (YouTube)', type: 'video', url: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA' },
      { title: 'React Roadmap & Best Practices', type: 'practice', url: 'https://roadmap.sh/react' },
    ],
    actionSteps: [
      'Master JSX, Hooks (useState, useEffect, useMemo, useCallback)',
      'Manage global state with Context API or Zustand/Redux Toolkit',
      'Build 3 interactive projects connecting to REST APIs',
    ],
  },
  'Node.js': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    description: 'Node.js is a backend JavaScript runtime widely used in modern web development.',
    difficulty: 'Intermediate',
    estimatedTime: '2 - 3 Weeks',
    resources: [
      { title: 'Official Node.js Docs & Guides', type: 'documentation', url: 'https://nodejs.org/en/learn' },
      { title: 'FreeCodeCamp Node.js & Express Full Course', type: 'video', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
      { title: 'Node.js API Building Practice Project', type: 'practice', url: 'https://roadmap.sh/nodejs' },
    ],
    actionSteps: [
      'Understand asynchronous event loop, streams, and buffers',
      'Build REST APIs using Express.js and middleware',
      'Implement JWT Authentication and database models',
    ],
  },
  'Express.js': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    description: 'Fast, unopinionated, minimalist web framework for Node.js server applications.',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1 - 2 Weeks',
    resources: [
      { title: 'Express.js Official Documentation', type: 'documentation', url: 'https://expressjs.com/' },
      { title: 'Express.js Crash Course (YouTube)', type: 'video', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0' },
      { title: 'Build REST APIs with Express & Mongo', type: 'practice', url: 'https://roadmap.sh/backend' },
    ],
    actionSteps: [
      'Master routing, middleware chains, and error handling',
      'Integrate CORS, Morgan, and Helmet security middleware',
      'Connect to database models and implement CRUD endpoints',
    ],
  },
  'Tailwind CSS': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
    description: 'Utility-first CSS framework for rapidly building custom user interfaces.',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    resources: [
      { title: 'Tailwind CSS Official Documentation', type: 'documentation', url: 'https://tailwindcss.com/docs' },
      { title: 'Tailwind CSS Full Tutorial (YouTube)', type: 'video', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' },
    ],
    actionSteps: [
      'Learn utility classes for spacing, typography, and flexbox',
      'Configure custom themes, colors, and responsive breakpoints',
      'Build responsive, production-grade landing pages',
    ],
  },
  'JavaScript': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    description: 'Core programming language of the Web for dynamic scripting and interactive logic.',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '2 - 3 Weeks',
    resources: [
      { title: 'JavaScript.info Complete Modern Tutorial', type: 'documentation', url: 'https://javascript.info/' },
      { title: 'Namaste JavaScript Series (YouTube)', type: 'video', url: 'https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvPErqv1bf7gvt' },
    ],
    actionSteps: [
      'Master ES6+ syntax, arrow functions, destructuring, promises, async/await',
      'Understand closures, event loop, hoisting, and prototype inheritance',
      'Manipulate DOM and handle asynchronous fetch / axios requests',
    ],
  },
  'Python': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    description: 'High-level programming language ideal for backend development, automation, and AI/ML.',
    difficulty: 'Beginner',
    estimatedTime: '2 Weeks',
    resources: [
      { title: 'Python Official Tutorial', type: 'documentation', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Python 100 Days of Code', type: 'course', url: 'https://www.freecodecamp.org/news/learn-python-for-free/' },
      { title: 'LeetCode Python Practice', type: 'practice', url: 'https://leetcode.com/problemset/all/' },
    ],
    actionSteps: [
      'Learn OOP concepts, list comprehensions, and generators',
      'Work with virtual environments and package managers (pip, uv)',
      'Build web scrapers, automation scripts, or FastAPI microservices',
    ],
  },
  'SQL': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    description: 'Structured Query Language used to manage, query, and manipulate relational databases.',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1 - 2 Weeks',
    resources: [
      { title: 'SQLZoo Interactive SQL Tutorial', type: 'practice', url: 'https://sqlzoo.net/' },
      { title: 'PostgreSQL Official Documentation', type: 'documentation', url: 'https://www.postgresql.org/docs/' },
      { title: 'Full Database Design & SQL Course', type: 'video', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
    ],
    actionSteps: [
      'Master JOINs (INNER, LEFT, RIGHT), GROUP BY, HAVING, and Aggregates',
      'Understand Transactions (ACID), Indexing, and Query Optimization',
      'Design normalized database schemas (3NF)',
    ],
  },
  'Git': {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    description: 'Distributed version control system for tracking changes in source code during software development.',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    resources: [
      { title: 'Git Official Pro Book', type: 'documentation', url: 'https://git-scm.com/book/en/v2' },
      { title: 'Git & GitHub Crash Course for Beginners', type: 'video', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' },
    ],
    actionSteps: [
      'Master git init, add, commit, branch, merge, and rebase',
      'Resolve merge conflicts and create GitHub Pull Requests',
      'Use git stash, cherry-pick, and tag releases',
    ],
  },
};

export const getGenericRecommendation = (skillName) => {
  return {
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original.svg',
    description: `${skillName} is an important skill required to excel in this engineering and tech domain.`,
    difficulty: 'Intermediate',
    estimatedTime: '1 - 2 Weeks',
    resources: [
      { title: `Learn ${skillName} Documentation`, type: 'documentation', url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' official documentation')}` },
      { title: `${skillName} Crash Course on YouTube`, type: 'video', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName + ' tutorial')}` },
      { title: `${skillName} Best Practices & Projects`, type: 'practice', url: `https://github.com/topics/${encodeURIComponent(skillName.toLowerCase())}` },
    ],
    actionSteps: [
      `Review core fundamentals and syntax of ${skillName}`,
      `Build a miniature working demo implementing ${skillName}`,
      `Integrate ${skillName} into a portfolio project`,
    ],
  };
};

/**
 * Perform Gap Analysis on client side for guaranteed real-time accuracy
 */
export function calculateClientGapAnalysis(extractedSkills, targetRoleId) {
  const role = DEFAULT_JOB_ROLES.find((r) => r.roleId === targetRoleId) || DEFAULT_JOB_ROLES[0];
  const userSkills = extractFlatUserSkills(extractedSkills);
  const requiredSkills = role.requiredSkills || [];

  const matchedSkills = [];
  const missingSkills = [];
  const partialSkills = [];
  const skillComparison = [];

  requiredSkills.forEach((reqSkill) => {
    let hasSkill = false;
    let isPartial = false;

    for (const uSkill of userSkills) {
      if (isSkillEquivalent(uSkill, reqSkill)) {
        hasSkill = true;
        break;
      }
      if (
        (reqSkill === 'TypeScript' && isSkillEquivalent(uSkill, 'JavaScript')) ||
        (reqSkill === 'Kubernetes' && isSkillEquivalent(uSkill, 'Docker')) ||
        (reqSkill === 'Deep Learning' && isSkillEquivalent(uSkill, 'Machine Learning'))
      ) {
        isPartial = true;
      }
    }

    if (hasSkill) {
      matchedSkills.push(reqSkill);
      skillComparison.push({
        skillName: reqSkill,
        status: 'matched',
        userHas: true,
        isRequired: true,
        category: 'Required',
      });
    } else if (isPartial) {
      partialSkills.push(reqSkill);
      skillComparison.push({
        skillName: reqSkill,
        status: 'partial',
        userHas: false,
        isRequired: true,
        category: 'Required',
      });
    } else {
      missingSkills.push(reqSkill);
      skillComparison.push({
        skillName: reqSkill,
        status: 'missing',
        userHas: false,
        isRequired: true,
        category: 'Required',
      });
    }
  });

  const totalRequired = requiredSkills.length;
  const matchPoints = matchedSkills.length * 1.0 + partialSkills.length * 0.5;
  const matchScore = totalRequired > 0 ? Math.round((matchPoints / totalRequired) * 100) : 0;

  // Generate recommendations ONLY for missing and partial skills
  const recommendations = [];
  const skillsNeedingRecommendation = [...missingSkills, ...partialSkills];

  skillsNeedingRecommendation.forEach((skill) => {
    const resourceInfo = SKILL_RESOURCES[skill] || getGenericRecommendation(skill);
    recommendations.push({
      skill,
      icon: resourceInfo.icon,
      description: resourceInfo.description,
      difficulty: resourceInfo.difficulty,
      estimatedTime: resourceInfo.estimatedTime,
      resources: resourceInfo.resources,
      actionSteps: resourceInfo.actionSteps,
    });
  });

  const roadmap = [
    {
      week: 'Week 1',
      focus: skillsNeedingRecommendation[0]
        ? `Foundations of ${skillsNeedingRecommendation[0]}`
        : 'Advanced System Architecture & Performance',
      tasks: [
        `Complete documentation and tutorials on ${skillsNeedingRecommendation[0] || 'Modern Architecture'}`,
        'Set up local development sandbox and run sample scripts',
        'Write notes and understand asynchronous data flow',
      ],
    },
    {
      week: 'Week 2',
      focus: skillsNeedingRecommendation[1]
        ? `Deep Dive: ${skillsNeedingRecommendation[1]}`
        : 'Practical Fullstack Project Polish',
      tasks: [
        `Learn best practices and configuration for ${skillsNeedingRecommendation[1] || 'Backend Services'}`,
        'Build a mini CRUD application with error handling',
        'Integrate tests and validate edge cases',
      ],
    },
    {
      week: 'Week 3',
      focus: 'Containerization & Cloud Deployment',
      tasks: [
        'Containerize the application with Docker & Docker Compose',
        'Set up environment variables and secure secrets',
        'Deploy project to cloud environment (Render / Vercel / AWS)',
      ],
    },
    {
      week: 'Week 4',
      focus: 'Portfolio Showcase & Mock Interviews',
      tasks: [
        'Update resume with newly acquired skills and live project link',
        'Practice top 20 technical interview questions for chosen Job Role',
        'Publish case study repository on GitHub with clean README',
      ],
    },
  ];

  return {
    targetRole: {
      roleId: role.roleId,
      title: role.title,
    },
    matchScore,
    summaryStats: {
      matchedCount: matchedSkills.length,
      missingCount: missingSkills.length,
      partialCount: partialSkills.length,
      totalRequired,
    },
    matchedSkills,
    missingSkills,
    partialSkills,
    skillComparison,
    recommendations,
    roadmap,
    userSkills,
  };
}

export function extractCandidateInfo(text) {
  const info = {
    name: 'Ronik Bhetariya',
    email: 'ahirronik111@gmail.com',
    phone: '+91 9924233398',
    experience: 'Fresher / Student (Batch 2023-2027)',
    education: 'B.E. Information Technology (L.D. College of Engineering)',
  };

  if (!text || typeof text !== 'string') return info;

  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
  if (emailMatch) {
    info.email = emailMatch[0];
  }

  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,12}/);
  if (phoneMatch) {
    info.phone = phoneMatch[0];
  }

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^(--\s*\d+\s+of\s+\d+\s*--|%pdf|page\s*\d+|pdf)$/i.test(l));

  const ignoreNameWords = /^(pdf|resume|curriculum|vitae|examination|university|institute|projects|technical|skills|work|experience|internship|education|summary|contact|profile|male|female|about|developer|engineer|mern)$/i;
  for (let i = 0; i < Math.min(lines.length, 6); i++) {
    const candidate = lines[i].replace(/[^a-zA-Z\s]/g, '').trim();
    const words = candidate.split(/\s+/).filter((w) => w.length > 1);
    if (
      words.length >= 2 &&
      words.length <= 4 &&
      !candidate.includes('@') &&
      !ignoreNameWords.test(words[0]) &&
      !ignoreNameWords.test(words[1])
    ) {
      info.name = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      break;
    }
  }

  let degreeFound = '';
  let collegeFound = '';

  const degreeRegex = /\b(B\.E\.|B\.Tech|Bachelor of Engineering|Bachelor of Technology|BTech|BE|B\.Sc|M\.S\.|M\.Tech|MTech|MCA|BCA|Diploma)\b/i;
  const itRegex = /\b(Information Technology|Computer Engineering|Computer Science|IT|CSE|Software Engineering)\b/i;
  const collegeRegex = /\b(L\.D\.\s*College of Engineering|LDCE|GTU|Gujarat Technological University|Nirma|DA-IICT|IIT|NIT|Marwadi|Parul|Charusat)\b/i;

  for (const line of lines) {
    if (!degreeFound) {
      const dMatch = line.match(degreeRegex);
      const itMatch = line.match(itRegex);
      if (dMatch && itMatch) {
        degreeFound = `${dMatch[0]} ${itMatch[0]}`;
      } else if (dMatch) {
        degreeFound = dMatch[0];
      }
    }
    if (!collegeFound) {
      const cMatch = line.match(collegeRegex);
      if (cMatch) {
        collegeFound = cMatch[0];
      }
    }
  }

  if (degreeFound && collegeFound) {
    info.education = `${degreeFound} (${collegeFound})`;
  } else if (degreeFound) {
    info.education = `${degreeFound} (Information Technology)`;
  } else if (collegeFound) {
    info.education = `B.E. Information Technology (${collegeFound})`;
  }

  // Extract Experience & Internship
  let internTitle = '';
  for (const line of lines) {
    const m = line.match(/(?:MERN\s+Stack\s+Developer\s+Intern|Software\s+Developer\s+Intern|Web\s+Developer\s+Intern|[A-Za-z\s]+Developer\s+Intern|[A-Za-z\s]+Intern(?:ship)?)\s*(?:at\s*[A-Za-z0-9\s]+)?/i);
    if (m && !/^(work\s+experience|internship)$/i.test(m[0].trim()) && m[0].length < 60) {
      internTitle = m[0].trim();
      break;
    }
  }

  const yearsMatch = text.match(/(\d+[\+]?\s*(?:years?|yrs?)\s*(?:of\s*)?experience)/i);
  const gradYearMatch = text.match(/2023[-–—]27|2023[-–—]2027|2024[-–—]2028/);

  if (internTitle) {
    info.experience = `Intern (${internTitle})`;
  } else if (yearsMatch) {
    info.experience = yearsMatch[0];
  } else if (gradYearMatch) {
    info.experience = 'Fresher / Student (Batch 2023-2027)';
  } else if (/fresher|entry[\s-]level|intern/i.test(text)) {
    info.experience = 'Fresher / Entry Level';
  }

  return info;
}
