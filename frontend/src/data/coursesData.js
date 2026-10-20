export const ACHIEVE_GOALS = [
  {
    id: 'expert-tutors',
    icon: 'GraduationCap',
    title: 'Expert & Friendly Tutors',
    desc: 'Tutors from top global universities and certified examiners who simplify tough concepts.'
  },
  {
    id: 'affordable-pricing',
    icon: 'BadgePercent',
    title: 'Affordable Pricing',
    desc: 'Transparent, flexible packages per subject or month with zero hidden fees.'
  },
  {
    id: 'adaptive-learning',
    icon: 'Sparkles',
    title: 'Adaptive Learning',
    desc: 'Custom pacing adjusted dynamically to your child’s diagnostic strengths and target board.'
  },
  {
    id: 'flexible-schedule',
    icon: 'Calendar',
    title: 'Flexible Schedule',
    desc: 'Pick your preferred days and times. Reschedule anytime with zero penalty.'
  },
  {
    id: 'personalized-support',
    icon: 'Headphones',
    title: 'Personalized Support',
    desc: 'Dedicated academic coordinator, bi-weekly progress reports, and 24/7 doubt clearing.'
  }
];

export const BOARDS_COVERED = [
  { name: 'Cambridge IGCSE & GCSE', code: 'CAIE / Edexcel', badge: 'Grades 8 - 10', icon: 'BookOpen' },
  { name: 'IB Diploma (DP) & MYP', code: 'International Baccalaureate', badge: 'SL & HL', icon: 'Award' },
  { name: 'Cambridge AS & A-Levels', code: 'Advanced Level', badge: 'Grades 11 - 12', icon: 'GraduationCap' },
  { name: 'SABIS Educational System', code: 'Middle East & International', badge: 'Term Exam Focus', icon: 'CheckCircle2' },
  { name: 'US Common Core & AP', code: 'College Board AP', badge: 'Calculus, Physics, Stats', icon: 'Star' },
  { name: 'CBSE & ICSE International', code: 'National & Expat Boards', badge: 'Grades 6 - 12', icon: 'Globe' },
  { name: 'Olympiads & Competitive Exams', code: 'AMC, SASMO, Kangaroo', badge: 'Global Ranks', icon: 'TrendingUp' }
];

export const CURRICULA = [
  { id: 'all', name: 'All Programs' },
  { id: 'academic', name: 'Academic Subjects' },
  { id: 'coding', name: 'Coding & Programming' },
  { id: 'communication', name: 'Communication Skills' },
  { id: 'languages', name: 'Global Languages' },
  { id: 'aptitude', name: 'Reasoning & Aptitude' }
];

export const COURSES = [
  {
    id: 'igcse-math-science',
    category: 'academic',
    title: 'Cambridge IGCSE & GCSE Tuition',
    subjects: ['Mathematics (Core/Ext)', 'Physics', 'Chemistry', 'Biology', 'Economics', 'English Lit'],
    targetGrades: 'Grades 8 - 10 (Ages 13-16)',
    examBoards: ['Cambridge CAIE', 'Pearson Edexcel', 'Oxford AQA'],
    format: '1-on-1 Personalized or Micro-batch (Max 3)',
    rating: 4.96,
    reviewsCount: 382,
    badge: 'Core Academic',
    badgeColor: 'blue',
    image: '/images/tutoring.jpg',
    features: [
      'Past 10 years solved paper mastery & mark-scheme decoding',
      'Diagnostic baseline test + personalized syllabus tracker',
      'Timed mock exam simulations with examiner commentary'
    ],
    description: 'Master Cambridge and Edexcel IGCSE curriculums with certified examiners and senior international educators.'
  },
  {
    id: 'ib-myp-dp',
    category: 'academic',
    title: 'IB MYP & Diploma Programme (DP)',
    subjects: ['Math AA/AI (SL & HL)', 'Physics HL', 'Chemistry HL', 'Biology HL', 'Economics HL'],
    targetGrades: 'Grades 9 - 12 (Ages 14-18)',
    examBoards: ['International Baccalaureate (IB)'],
    format: '1-on-1 Elite Tutoring',
    rating: 4.98,
    reviewsCount: 312,
    badge: 'Top Tier IB',
    badgeColor: 'gold',
    image: '/images/tutoring.jpg',
    features: [
      'Internal Assessment (IA) guidance & rubric criteria coaching',
      'Theory of Knowledge (TOK) and Extended Essay (EE) mentoring',
      'Specialized Higher Level (HL) deep-dive problem solving'
    ],
    description: 'Designed specifically for the rigorous demands of IB DP 1 and 2 to consistently achieve Grade 7 scores.'
  },
  {
    id: 'as-a-levels',
    category: 'academic',
    title: 'Cambridge AS & A-Levels',
    subjects: ['Pure Math (P1, P3, M1, S1)', 'Physics', 'Chemistry', 'Economics', 'Computer Science'],
    targetGrades: 'Grades 11 - 12 (Ages 16-19)',
    examBoards: ['CAIE', 'Edexcel International A-Level'],
    format: '1-on-1 Specialized Mentorship',
    rating: 4.95,
    reviewsCount: 245,
    badge: 'Advanced Level',
    badgeColor: 'blue',
    image: '/images/tutoring.jpg',
    features: [
      'Deep conceptual clarity for demanding A-Level papers',
      'Mechanics and Probability & Statistics module specialization',
      'University entrance guidance & scholarship exam prep'
    ],
    description: 'Advanced subject preparation helping students secure top conditional offers for Russell Group and Ivy League universities.'
  },
  {
    id: 'sabis-tuition',
    category: 'academic',
    title: 'SABIS Educational System Tuition',
    subjects: ['Mathematics (SABIS Books)', 'Physics', 'Chemistry', 'Biology', 'SABIS Term Finals'],
    targetGrades: 'Grades 4 - 12 (Choueifat Schools)',
    examBoards: ['SABIS Network (ISC Dubai, Abu Dhabi, Sharjah, Doha)'],
    format: '1-on-1 Direct Syllabus Support',
    rating: 4.93,
    reviewsCount: 218,
    badge: 'SABIS Specialist',
    badgeColor: 'green',
    image: '/images/tutoring.jpg',
    features: [
      'Strict adherence to SABIS AMS (Periodic & Term Exam) cycles',
      'Weekly concept reinforcement from SABIS curriculum books',
      'Rigorous practice to ensure 90%+ scores in school rankings'
    ],
    description: 'Specialized tutors experienced with the distinctive SABIS methodology, AMS tests, and periodic exam preparation.'
  },
  {
    id: 'coding-python-ai',
    category: 'coding',
    title: 'Python, AI & Data Science for Young Minds',
    subjects: ['Python Fundamentals', 'Machine Learning Basics', 'Data Visualization', 'Game Dev'],
    targetGrades: 'Ages 10 - 18',
    examBoards: ['Hands-on Capstone Projects', 'GitHub Portfolio'],
    format: 'Interactive 1-on-1 or Small Lab',
    rating: 4.92,
    reviewsCount: 260,
    badge: 'Future Tech',
    badgeColor: 'blue',
    image: '/images/steam.jpg',
    features: [
      'Build 8 real-world software applications and playable games',
      'Introduction to AI models, Computer Vision & ChatGPT APIs',
      'Earn accredited Magπ Young Tech Prodigy Certificate'
    ],
    description: 'Equip your child with real-world computer science, algorithms, and practical AI application skills.'
  },
  {
    id: 'coding-scratch-web',
    category: 'coding',
    title: 'Scratch Coding & Interactive Web Development',
    subjects: ['Scratch Block Logic', 'HTML5 & CSS3', 'JavaScript Animations', 'Interactive Games'],
    targetGrades: 'Ages 7 - 14 (Beginners)',
    examBoards: ['Interactive Project Showcase'],
    format: 'Visual, Gamified 1-on-1 Sessions',
    rating: 4.94,
    reviewsCount: 184,
    badge: 'Kids Coding',
    badgeColor: 'gold',
    image: '/images/steam.jpg',
    features: [
      'Drag-and-drop game creation moving into real code syntax',
      'Develop algorithmic thinking, debugging, and computational logic',
      'Launch their very own personal website to show friends and family'
    ],
    description: 'A fun, engaging entry point into technology where young learners build animations, stories, and dynamic games.'
  },
  {
    id: 'communication-public-speaking',
    category: 'communication',
    title: 'Public Speaking, Debate & Model UN (MUN)',
    subjects: ['Speech Structuring', 'Voice Modulation', 'Debate Rebuttals', 'MUN Position Papers', 'Impromptu Speaking'],
    targetGrades: 'Ages 8 - 18',
    examBoards: ['MUN / Debate Certifications'],
    format: '1-on-1 Speech Coaching & Group Debates',
    rating: 4.97,
    reviewsCount: 220,
    badge: 'Leadership',
    badgeColor: 'blue',
    image: '/images/tutoring.jpg',
    features: [
      'Overcome stage fright and speak with commanding poise',
      'Master the art of persuasive rhetoric, debate motions, and research',
      'Weekly live speech delivery recorded and critiqued by international coaches'
    ],
    description: 'Nurture articulate, persuasive leaders equipped to win school debates, MUN conferences, and college interviews.'
  },
  {
    id: 'communication-creative-writing',
    category: 'communication',
    title: 'Creative Writing & Advanced Vocabulary',
    subjects: ['Narrative Crafting', 'Poetic Devices', 'Descriptive Essays', 'Critical Reading', 'Vocabulary Booster'],
    targetGrades: 'Ages 8 - 16',
    examBoards: ['Publishing Portfolio'],
    format: '1-on-1 Author Mentorship',
    rating: 4.91,
    reviewsCount: 175,
    badge: 'Creative Arts',
    badgeColor: 'green',
    image: '/images/tutoring.jpg',
    features: [
      'Techniques for character development, plot twists, and sensory imagery',
      'Learn 500+ high-frequency academic vocabulary words in context',
      'Publish a short story collection in Magπ’s student anthology'
    ],
    description: 'Ignite the imagination and cultivate articulate writers who can express sophisticated thoughts with literary finesse.'
  },
  {
    id: 'languages-french-spanish',
    category: 'languages',
    title: 'French, Spanish & German Fluency',
    subjects: ['Conversational Fluency', 'DELF / DELE Exam Prep', 'Grammar & Accent Coaching', 'IB/IGCSE Second Language'],
    targetGrades: 'All Ages (Kids & Teens)',
    examBoards: ['CEFR (A1 to B2)', 'Cambridge / IB Second Language'],
    format: '1-on-1 Native Speaker Sessions',
    rating: 4.95,
    reviewsCount: 210,
    badge: 'Native Tutors',
    badgeColor: 'blue',
    image: '/images/tutoring.jpg',
    features: [
      'Immersion-based conversational practice with native speakers',
      'Cultural idioms, listening comprehension, and natural accent training',
      'Targeted preparation for DELF Prim/Junior, DELE, Goethe-Zertifikat'
    ],
    description: 'Transform language learning from rote memorization into real-world spoken confidence and exam excellence.'
  },
  {
    id: 'aptitude-olympiad',
    category: 'aptitude',
    title: 'Mathematical Olympiad & Kangaroo Math',
    subjects: ['Number Theory', 'Combinatorics', 'Euclidean Geometry', 'AMC 8/10/12', 'SASMO', 'Math Kangaroo'],
    targetGrades: 'Grades 3 - 11',
    examBoards: ['AMC', 'SASMO', 'UKMT', 'SEAMO', 'Kangaroo'],
    format: 'Intensive Problem Solving Mentorship',
    rating: 4.98,
    reviewsCount: 230,
    badge: 'Competitive Edge',
    badgeColor: 'gold',
    image: '/images/tutoring.jpg',
    features: [
      'Advanced non-routine problem solving heuristics and shortcuts',
      'Pattern identification, logic deduction, and speed calculations',
      'Mentorship by former Olympiad medalists and mathematics scholars'
    ],
    description: 'Develop deep analytical power, strategic thinking, and international competition medal readiness.'
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'event-1',
    title: 'Mastering IGCSE Math: Secrets to Securing an A*',
    date: 'Saturday, Nov 8, 2026',
    time: '5:00 PM - 6:30 PM (GST / Dubai)',
    speaker: 'Dr. Alistair Finch (Senior Cambridge Examiner)',
    type: 'Free Masterclass',
    badge: 'Cambridge CAIE',
    seatsLeft: 18,
    description: 'A deep-dive analysis of the most commonly failed IGCSE Extended Math past paper questions, common mark scheme traps, and time-management strategies.'
  },
  {
    id: 'event-2',
    title: 'IB DP Math AA vs. AI: Which Should You Pick?',
    date: 'Sunday, Nov 16, 2026',
    time: '6:00 PM - 7:15 PM (GMT / London)',
    speaker: 'Elena Vance (IB Diploma Coordinator)',
    type: 'Interactive Webinar',
    badge: 'IB Diploma',
    seatsLeft: 12,
    description: 'Clear guidance for Grade 10 & 11 students choosing between Math Analysis & Approaches vs. Applications & Interpretation for university engineering, economics, and medicine.'
  },
  {
    id: 'event-3',
    title: 'AI & Python for Kids: Build Your First Chatbot',
    date: 'Saturday, Nov 22, 2026',
    time: '4:00 PM - 5:30 PM (SGT / Singapore)',
    speaker: 'Rohan Mehta (Tech Prodigy Lead)',
    type: 'Hands-on Workshop',
    badge: 'Future Tech',
    seatsLeft: 8,
    description: 'A fun, beginner-friendly live coding workshop where students aged 10-16 write live Python code to create an interactive conversational chatbot.'
  }
];

export const COMPARISON_DATA = [
  {
    feature: '1-on-1 Dedicated Attention',
    magpi: '100% Focused on 1 student with customized pacing',
    offline: '1 teacher split across 30+ students',
    genericVideo: 'Zero personal attention (pre-recorded)'
  },
  {
    feature: 'Curriculum-Specific Certified Experts',
    magpi: 'Vetted examiners and subject specialists for your exact board',
    offline: 'General teachers who teach mixed curriculums',
    genericVideo: 'Generic video syllabus without curriculum depth'
  },
  {
    feature: 'Flexible Schedule & Zero Commute',
    magpi: 'Learn from home; reschedule anytime with 0 penalty',
    offline: 'Rigid batch timings + 1-2 hours lost in traffic',
    genericVideo: 'Anytime, but zero accountability'
  },
  {
    feature: 'Interactive Digital Whiteboard & Notes',
    magpi: 'Real-time collaborative whiteboard, saved PDF notes, recordings',
    offline: 'Manual blackboard notes often missed or lost',
    genericVideo: 'Passive viewing without interactive annotation'
  },
  {
    feature: 'Real-Time Parent Tracking & Mentorship',
    magpi: 'Bi-weekly diagnostic reports & dedicated academic coordinator',
    offline: 'Occasional brief parent-teacher meetings once a year',
    genericVideo: 'No personalized progress tracking'
  },
  {
    feature: 'Guaranteed Tutor Compatibility',
    magpi: '100% Tutor Match Guarantee: Switch anytime for free',
    offline: 'Locked into the assigned center teacher',
    genericVideo: 'No real teacher interaction'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    parentName: 'Dr. Sarah Al-Mansoori',
    studentName: 'Zayd (Grade 10, IGCSE)',
    location: 'Dubai, UAE',
    flag: '🇦🇪',
    board: 'Cambridge IGCSE Physics & Math',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Finding a tutor who truly understands the Cambridge IGCSE Physics mark-scheme was challenging until we found Magπ. In just 4 months, Zayd progressed from a B grade to consistently scoring A* in his mocks.'
  },
  {
    id: 2,
    parentName: 'Marcus & Elena Vance',
    studentName: 'Sophie (Grade 11, IB DP)',
    location: 'London, United Kingdom',
    flag: '🇬🇧',
    board: 'IB Diploma (Math AA HL)',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'IB Math Higher Level was overwhelming for Sophie. Her Magπ mentor broke down complex calculus and probability concepts with incredible patience and visual whiteboards. Her confidence has soared.'
  },
  {
    id: 3,
    parentName: 'Rajesh & Priya Sengupta',
    studentName: 'Aarav (Age 12, Python & AI)',
    location: 'Singapore',
    flag: '🇸🇬',
    board: 'Coding & STEAM Lab',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Most coding classes just show videos. At Magπ, Aarav builds real interactive programs and writes clean Python with his mentor. He even built a weather prediction model for his school science fair!'
  },
  {
    id: 4,
    parentName: 'Jennifer Miller',
    studentName: 'Ethan (Grade 9, AP Prep)',
    location: 'California, USA',
    flag: '🇺🇸',
    board: 'US Curriculum & SAT Prep',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'The flexibility of scheduling and the regular fortnightly progress reports give us total peace of mind. We know exactly what Ethan is learning and where he is making measurable strides.'
  }
];

export const FAQS = [
  {
    q: 'How does the free 45-minute demo session work?',
    a: 'Once you book a demo, our academic advisor reaches out to understand your child\'s curriculum (IB, IGCSE, SABIS, CBSE, US Board, etc.), current grade, and areas of challenge. We then match you with a specialized senior tutor for a live 45-minute diagnostic session where the student experiences our interactive digital classroom firsthand.'
  },
  {
    q: 'How are Magπ tutors screened and certified?',
    a: 'We maintain an acceptance rate under 1.8%. Every Magπ tutor undergoes rigorous screening: verification of academic credentials (from top global universities), subject proficiency testing, live teaching simulations evaluated by senior examiners, and thorough background checks.'
  },
  {
    q: 'What if my child does not feel comfortable with the assigned tutor?',
    a: 'Student-tutor chemistry is vital to learning. If for any reason you feel the teaching style is not an optimal match, our 100% Match Guarantee allows you to switch tutors immediately at zero extra charge.'
  },
  {
    q: 'What devices or equipment are required for classes?',
    a: 'A computer, laptop, or tablet (iPad/Surface) with a stable internet connection, a webcam, and headphones is all you need. For advanced math and physics problem-solving, our digital whiteboard includes interactive math equation editors and drawing tools.'
  },
  {
    q: 'Can we reschedule sessions if my child has school exams or travel plans?',
    a: 'Yes! Magπ offers ultimate flexibility. You can reschedule any class with a simple notice to your dedicated academic coordinator with zero penalty.'
  }
];
