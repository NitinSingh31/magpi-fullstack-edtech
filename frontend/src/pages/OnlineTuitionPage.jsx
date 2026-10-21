import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  FileText, 
  Video, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import './PagesCommon.css';
import './OnlineTuitionPage.css';
import FacultyShowcase from '../components/FacultyShowcase';
import TuitionCalculator from '../components/TuitionCalculator';

export default function OnlineTuitionPage({ onOpenDemo }) {
  const [selectedBoard, setSelectedBoard] = useState('all');

  const boards = [
    {
      id: 'igcse',
      badge: 'Grades 8 - 10 (Ages 13-16)',
      title: 'Cambridge IGCSE & GCSE Online Tuition',
      boardsList: 'CAIE 0580/0607, Pearson Edexcel, Oxford AQA',
      summary: 'Master Cambridge and Edexcel IGCSE syllabuses with certified examiners and senior international educators.',
      subjects: [
        'Mathematics (Core & Extended 0580/0607)',
        'Physics (0625/4PH1)',
        'Chemistry (0620/4CH1)',
        'Biology (0610/4BI1)',
        'Economics (0455)',
        'Computer Science (0478)',
        'English Language & Literature'
      ],
      features: [
        'Past 10 years solved paper mastery & mark-scheme decoding',
        'Command word training ("Evaluate" vs "Deduce" vs "Calculate")',
        'Diagnostic baseline test + personalized syllabus tracker',
        'Timed mock exam simulations with examiner commentary'
      ],
      avgElevation: '+2.4 Grades'
    },
    {
      id: 'ib',
      badge: 'Grades 9 - 12 (Ages 14-18)',
      title: 'International Baccalaureate (IB MYP & DP)',
      boardsList: 'IB Middle Years Programme (MYP) & Diploma Programme (DP)',
      summary: 'Elevate your IB scores with senior examiners who simplify complex concepts and mentor high-scoring Internal Assessments.',
      subjects: [
        'Mathematics Analysis & Approaches (AA SL & HL)',
        'Mathematics Applications & Interpretation (AI SL & HL)',
        'Physics (SL & HL)',
        'Chemistry (SL & HL)',
        'Biology (SL & HL)',
        'Economics (SL & HL)',
        'Internal Assessment (IA) Mentorship & Scaffolding'
      ],
      features: [
        'Guidance from certified IB Examiners with proven 7/7 student track records',
        'Rigorous preparation for Paper 1 (No Calc), Paper 2 (Calc) and Paper 3 investigations',
        'Scoring rubrics breakdown for Internal Assessments (IA)',
        'Theory of Knowledge (TOK) and conceptual essay structure support'
      ],
      avgElevation: '6.4 / 7 Avg IB Score'
    },
    {
      id: 'alevels',
      badge: 'Grades 11 - 12 (Pre-University)',
      title: 'Cambridge International AS & A-Levels',
      boardsList: 'Cambridge Assessment (CAIE), Edexcel International A-Levels',
      summary: 'Deep conceptual rigor and university entrance preparation for top STEM, Medicine, and Economics degrees worldwide.',
      subjects: [
        'Pure Mathematics (P1, P2, P3)',
        'Mechanics (M1) & Probability & Statistics (S1, S2)',
        'Further Mathematics (Complex Numbers, Matrices, Differential Equations)',
        'Physics (9702) & Practical Paper 3 Coaching',
        'Chemistry (9701)',
        'Economics (9708)'
      ],
      features: [
        'Topic-wise past paper questions categorized by difficulty and theme',
        'STEP, MAT & TMUA university entrance exam readiness',
        'Examiner tips for scoring A* in unstructured, multi-step problem solving',
        'Micro-batch or 1-on-1 pacing tailored to school test timelines'
      ],
      avgElevation: '89% Achieve A* or A'
    },
    {
      id: 'sabis',
      badge: 'Choueifat & SABIS Network (Grades 6 - 12)',
      title: 'SABIS Educational System Online Tuition',
      boardsList: 'International School of Choueifat (ISC) Curriculum',
      summary: 'Specialized AMS preparation, periodic exams revision, and mastery of the high-velocity SABIS academic cadence.',
      subjects: [
        'SABIS Mathematics (Algebra, Geometry, Pre-Calc)',
        'SABIS Chemistry & Periodic Exam Prep',
        'SABIS Physics & Mechanics',
        'SABIS Biology & Term Final Exams'
      ],
      features: [
        'Intensive drills mapped to Academic Monitoring System (AMS) quizzes',
        'Targeted formula recall and rapid problem-solving speed drills',
        'Weekly periodic exam simulations with instant mistake diagnosis',
        'Support for students struggling to keep up with the fast-paced SABIS syllabus'
      ],
      avgElevation: '+22% AMS Marks'
    },
    {
      id: 'ap',
      badge: 'Grades 9 - 12 (High School / US College Credit)',
      title: 'US Common Core & Advanced Placement (AP) Prep',
      boardsList: 'College Board Certified AP Syllabus',
      summary: 'Secure a 5 out of 5 on College Board AP exams and earn university credits before high school graduation.',
      subjects: [
        'AP Calculus AB & AP Calculus BC',
        'AP Physics 1, 2 & AP Physics C (Mechanics / E&M)',
        'AP Chemistry & AP Biology',
        'AP Statistics & AP Computer Science A'
      ],
      features: [
        'Official College Board FRQ (Free Response Questions) grading rubrics',
        'Mastering MCQ speed, pacing, and strategic deduction techniques',
        'College Board digital exam simulator practice tests',
        'Taught by AP Reader vetted educators'
      ],
      avgElevation: '88% Score 4 or 5'
    },
    {
      id: 'cbse',
      badge: 'Grades 6 - 12 (India & GCC Schools)',
      title: 'CBSE & ICSE Global Curriculum Tuition',
      boardsList: 'Central Board of Secondary Education (CBSE) & CISCE',
      summary: 'Strong foundational conceptual mastery, board exam answer presentation coaching, and competitive exam integration.',
      subjects: [
        'Mathematics (Class 9 - 12)',
        'Physics (Class 10 - 12)',
        'Chemistry (Class 10 - 12)',
        'Biology & English Core'
      ],
      features: [
        'NCERT Textbook & Exemplar exhaustive question solving',
        'Step-marking optimization for Board answer sheets',
        'Timed chapter tests and full 3-hour pre-board mock examinations',
        'Foundation bridge for JEE, NEET, and international university pathways'
      ],
      avgElevation: '95%+ Board Scores'
    }
  ];

  const filteredBoards = selectedBoard === 'all' 
    ? boards 
    : boards.filter(b => b.id === selectedBoard);

  return (
    <div className="online-tuition-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Online Tuition</span>
          </div>
          <div className="page-hero-badge">
            <GraduationCap size={14} /> 1-on-1 Global Academic Tuition
          </div>
          <h1 className="page-hero-title">
            Personalized Online Tuitions for <span className="text-highlight">IB, IGCSE, SABIS & A-Levels</span>
          </h1>
          <p className="page-hero-desc">
            One-on-one and small micro-batch classes tailored to your child’s target board, syllabus specifications, and learning pace. Taught by certified examiners and senior educators from across the globe.
          </p>
          <div className="page-hero-actions">
            <button onClick={() => onOpenDemo('Online Tuition')} className="btn btn-primary">
              <Sparkles size={16} /> Book a Free Demo Class
            </button>
            <a href="#board-explorer" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Explore Curriculums <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Users size={22} /></div>
              <div>
                <strong>100% 1-on-1 Undivided Attention</strong>
                <span>Personalized lesson pacing with dedicated tutor</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><FileText size={22} /></div>
              <div>
                <strong>10-Year Past Paper Mastery</strong>
                <span>Examiner-vetted mark schemes & step-by-step solutions</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Clock size={22} /></div>
              <div>
                <strong>Flexible Timings Across 18+ Timezones</strong>
                <span>Classes scheduled around your child's routine</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><ShieldCheck size={22} /></div>
              <div>
                <strong>Tutor Match Guarantee</strong>
                <span>Free tutor replacement if not 100% satisfied</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Board Selector Tabs */}
      <section id="board-explorer" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">International Boards</div>
            <h2>Choose Your Academic Curriculum</h2>
            <p>
              Select your child’s educational board to view detailed subject coverage, examiner strategies, and customized learning blueprints.
            </p>
          </div>

          <div className="board-filter-tabs">
            <button 
              className={`board-filter-btn ${selectedBoard === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('all')}
            >
              All Curriculums
            </button>
            <button 
              className={`board-filter-btn ${selectedBoard === 'igcse' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('igcse')}
            >
              Cambridge IGCSE
            </button>
            <button 
              className={`board-filter-btn ${selectedBoard === 'ib' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('ib')}
            >
              IB DP / MYP
            </button>
            <button 
              className={`board-filter-btn ${selectedBoard === 'alevels' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('alevels')}
            >
              A & AS Levels
            </button>
            <button 
              className={`board-filter-btn ${selectedBoard === 'sabis' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('sabis')}
            >
              SABIS System
            </button>
            <button 
              className={`board-filter-btn ${selectedBoard === 'ap' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('ap')}
            >
              US AP Prep
            </button>
            <button 
              className={`board-filter-btn ${selectedBoard === 'cbse' ? 'active' : ''}`}
              onClick={() => setSelectedBoard('cbse')}
            >
              CBSE / ICSE
            </button>
          </div>

          {/* Board Detailed Cards */}
          <div className="board-cards-container">
            {filteredBoards.map((b) => (
              <div key={b.id} id={b.id} className="board-detail-card">
                <div className="board-card-header">
                  <div>
                    <span className="board-grade-badge">{b.badge}</span>
                    <h3 className="board-card-title">{b.title}</h3>
                    <div className="board-exam-affiliations">
                      <strong>Exam Boards:</strong> {b.boardsList}
                    </div>
                  </div>
                  <div className="board-elevation-box">
                    <span className="elevation-label">Average Elevation</span>
                    <span className="elevation-value">{b.avgElevation}</span>
                  </div>
                </div>

                <p className="board-summary-text">{b.summary}</p>

                <div className="board-card-body-grid">
                  <div className="board-subjects-col">
                    <h4>Core Subjects Covered</h4>
                    <ul className="subjects-list">
                      {b.subjects.map((sub, i) => (
                        <li key={i}>
                          <Check size={16} className="check-icon" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="board-methodology-col">
                    <h4>Examiner-Led Methodology</h4>
                    <ul className="features-list">
                      {b.features.map((feat, i) => (
                        <li key={i}>
                          <Zap size={16} className="zap-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="board-card-actions">
                      <button 
                        onClick={() => onOpenDemo(b.title)} 
                        className="btn btn-primary"
                      >
                        <Sparkles size={16} /> Book Free Trial for {b.title.split(' ')[0]}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Grade Levels We Support */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">All Stages</div>
            <h2>Tailored Instruction Across Every Grade Stage</h2>
            <p>
              From building foundational numeracy and literacy in primary school to conquering high-stakes pre-university finals.
            </p>
          </div>

          <div className="grade-stages-grid">
            <div className="stage-card">
              <div className="stage-number">01</div>
              <h3>Primary Years (Grades 1 – 5)</h3>
              <p>
                Developing core mental math, reading fluency, scientific curiosity, and confidence through joyful, visual learning.
              </p>
              <ul className="stage-bullets">
                <li>Hands-on visual math & logic</li>
                <li>Phonics & creative storytelling</li>
                <li>Basic STEM concepts & inquiry</li>
              </ul>
            </div>

            <div className="stage-card">
              <div className="stage-number">02</div>
              <h3>Middle School (Grades 6 – 8)</h3>
              <p>
                Bridging primary concepts to rigorous academic syllabuses. Preparing students for the transition to IGCSE / MYP.
              </p>
              <ul className="stage-bullets">
                <li>Pre-algebra & geometry proofs</li>
                <li>Physics, Chemistry & Biology basics</li>
                <li>Essay structuring & critical reading</li>
              </ul>
            </div>

            <div className="stage-card featured">
              <div className="stage-number">03</div>
              <div className="stage-hot-pill">High Impact</div>
              <h3>Exam Years (Grades 9 – 12)</h3>
              <p>
                Intense board exam training, 10-year past paper drilling, mark scheme decoding, and college profile building.
              </p>
              <ul className="stage-bullets">
                <li>Cambridge IGCSE & A-Level papers</li>
                <li>IB DP Math AA/AI HL & Sciences</li>
                <li>AP Calculus, AP Physics & College Credit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Accredited Faculty Showcase */}
      <FacultyShowcase onOpenDemo={onOpenDemo} />

      {/* 6. Tuition Fee & Savings Calculator */}
      <TuitionCalculator onOpenDemo={onOpenDemo} />

      {/* 7. Trial Class Booking Call to Action */}
      <section className="page-cta-banner">
        <div className="container cta-content-wrapper">
          <h2>Get a Personalized Study Plan for Your Child</h2>
          <p>
            Book a 45-minute zero-obligation trial class. Our senior faculty will conduct a baseline diagnostic assessment and share a personalized syllabus roadmap.
          </p>
          <div className="cta-actions">
            <button onClick={() => onOpenDemo('Academic Tuition')} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book a Free Demo Class
            </button>
            <Link to="/contact-us" className="btn btn-secondary btn-lg">
              Speak with an Academic Counselor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
