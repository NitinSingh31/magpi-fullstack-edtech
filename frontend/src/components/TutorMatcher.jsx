import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Star, 
  Clock, 
  RotateCcw, 
  UserCheck, 
  GraduationCap, 
  Compass,
  Check
} from 'lucide-react';
import './TutorMatcher.css';

const TUTOR_PROFILES = [
  {
    id: 'tutor_jonathan',
    name: 'Dr. Jonathan Vance',
    role: 'Ex-Cambridge IGCSE & A-Level Examiner',
    credentials: 'PhD Applied Math, Cambridge University',
    rating: 4.99,
    reviewsCount: 148,
    hoursTaught: '1,850+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    curriculums: ['Cambridge IGCSE', 'AS & A-Levels', 'IB MYP / DP'],
    subjects: ['Mathematics', 'Physics'],
    style: 'Visual & Interactive',
    highlight: 'Official Cambridge examiner with 9+ years experience. Helped 88% of students achieve Grade 8 or 9 (A*).'
  },
  {
    id: 'tutor_elena',
    name: 'Elena Rostova',
    role: 'IB Diploma (DP) Lead Examiner',
    credentials: 'MSc Imperial College London • Perfect 45/45 IB Alum',
    rating: 4.98,
    reviewsCount: 124,
    hoursTaught: '1,420+',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    curriculums: ['IB MYP / DP', 'Cambridge IGCSE', 'US Common Core / AP'],
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    style: 'Patient & Step-by-Step',
    highlight: 'Specialist in IB Internal Assessments (IA) and Paper 1 & 2 exam timing techniques.'
  },
  {
    id: 'tutor_priya',
    name: 'Priya Sharma',
    role: 'AI & Coding Lab Director',
    credentials: 'BTech Computer Science • Stanford AI Educator Fellow',
    rating: 4.97,
    reviewsCount: 96,
    hoursTaught: '1,100+',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    curriculums: ['STEAM & AI Coding'],
    subjects: ['Python & AI', 'Coding & Algorithms', 'Robotics'],
    style: 'Visual & Interactive',
    highlight: 'Ex-Google software engineer teaching real-world game development and machine learning logic.'
  },
  {
    id: 'tutor_marcus',
    name: 'Marcus Chen',
    role: 'AP Calculus & SAT Specialist',
    credentials: 'BSc Princeton University • 800/800 SAT Math',
    rating: 4.98,
    reviewsCount: 112,
    hoursTaught: '1,350+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    curriculums: ['US Common Core / AP', 'Cambridge IGCSE'],
    subjects: ['Mathematics', 'Chemistry', 'Economics'],
    style: 'Fast-Paced & Rigorous',
    highlight: 'AP 5/5 score master. Specializes in rapid MCQ strategies and free-response clarity.'
  },
  {
    id: 'tutor_sophie',
    name: 'Madame Sophie Laurent',
    role: 'Native DELF/DALF French Examiner',
    credentials: 'Sorbonne Université, Paris • Native French & Spanish',
    rating: 4.99,
    reviewsCount: 88,
    hoursTaught: '1,200+',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    curriculums: ['Global Languages', 'Cambridge IGCSE', 'IB MYP / DP'],
    subjects: ['French', 'Spanish'],
    style: 'Patient & Step-by-Step',
    highlight: 'Native Parisian examiner. Transforms hesitant speakers into fluent, confident conversationalists.'
  }
];

export default function TutorMatcher({ onOpenDemo }) {
  const [step, setStep] = useState(1);
  const [curriculum, setCurriculum] = useState('Cambridge IGCSE');
  const [subject, setSubject] = useState('Mathematics');
  const [goal, setGoal] = useState('aiming_top');
  const [style, setStyle] = useState('visual');
  const [isScanning, setIsScanning] = useState(false);
  const [matches, setMatches] = useState([]);

  const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Python & AI', 'French', 'Spanish', 'Economics'];

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Intelligent matching algorithm
      let matched = TUTOR_PROFILES.filter(t => 
        t.curriculums.includes(curriculum) || t.subjects.includes(subject)
      );

      if (matched.length === 0) {
        matched = TUTOR_PROFILES.slice(0, 2);
      } else if (matched.length > 2) {
        matched = matched.slice(0, 2);
      }

      setMatches(matched);
      setIsScanning(false);
      setStep(4);
    }, 1200);
  };

  const handleReset = () => {
    setStep(1);
    setMatches([]);
  };

  const handleBookWithTutor = (tutor) => {
    if (onOpenDemo) {
      onOpenDemo(`${subject} with ${tutor.name} (${curriculum})`);
    }
  };

  return (
    <section className="section tutor-matcher-section" id="find-tutor">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-tag gold">
            <Compass size={14} /> AI Pedagogical Matchmaker
          </div>
          <h2 className="section-title">
            Find Your Ideal 1-on-1 Tutor in <span className="highlight-text">45 Seconds</span>
          </h2>
          <p className="section-subtitle">
            Every student learns differently. Tell us your target syllabus and academic goals, 
            and our algorithm matches you with the top-performing examiner for your child.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="matcher-card">
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="matcher-progress-bar">
              <div className="progress-step-item active">
                <span className="step-circle">{step > 1 ? <Check size={14} /> : '1'}</span>
                <span className="step-label">Curriculum & Subject</span>
              </div>
              <div className="progress-line active"></div>
              <div className={`progress-step-item ${step >= 2 ? 'active' : ''}`}>
                <span className="step-circle">{step > 2 ? <Check size={14} /> : '2'}</span>
                <span className="step-label">Academic Goal</span>
              </div>
              <div className="progress-line active"></div>
              <div className={`progress-step-item ${step >= 3 ? 'active' : ''}`}>
                <span className="step-circle">{step === 3 ? '3' : '3'}</span>
                <span className="step-label">Teaching Style</span>
              </div>
            </div>
          )}

          {/* Step 1: Curriculum & Subject */}
          {step === 1 && (
            <div className="matcher-step-content">
              <h3>Step 1: What curriculum and subject is your student studying?</h3>
              
              <div className="matcher-field-group">
                <label className="field-label">Target Curriculum / Board</label>
                <div className="options-pill-grid">
                  {[
                    'Cambridge IGCSE',
                    'IB MYP / DP',
                    'AS & A-Levels',
                    'US Common Core / AP',
                    'STEAM & AI Coding',
                    'Global Languages'
                  ].map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      className={`option-pill ${curriculum === curr ? 'selected' : ''}`}
                      onClick={() => setCurriculum(curr)}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="matcher-field-group">
                <label className="field-label">Focus Subject</label>
                <div className="options-pill-grid subjects-grid">
                  {subjectsList.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      className={`option-pill ${subject === sub ? 'selected' : ''}`}
                      onClick={() => setSubject(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="matcher-nav-row">
                <div></div>
                <button 
                  type="button" 
                  className="btn btn-primary btn-next"
                  onClick={() => setStep(2)}
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Student's Academic Need */}
          {step === 2 && (
            <div className="matcher-step-content">
              <h3>Step 2: What is your student's primary academic focus?</h3>
              <p className="step-sub">We use this to pair your child with a specialist in that exact pedagogical phase.</p>

              <div className="goals-options-grid">
                {[
                  {
                    id: 'aiming_top',
                    title: 'Aiming for Grade 9 / A* or 7 (IB)',
                    desc: 'Mastering marking schemes, past paper tricks, and avoiding high-frequency examiner traps.'
                  },
                  {
                    id: 'concept_foundation',
                    title: 'Concept Rebuilding & Confidence',
                    desc: 'Filling core learning gaps, breaking down complex theories, and building solid fundamentals.'
                  },
                  {
                    id: 'homework_tests',
                    title: 'Regular School Test & Homework Mastery',
                    desc: 'Weekly guided practice, school test preparation, and consistent academic accountability.'
                  },
                  {
                    id: 'olympiad',
                    title: 'Competitive Olympiad & Kangaroo Prep',
                    desc: 'Advanced problem solving, non-routine mathematics, and logic puzzle competitions.'
                  }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`goal-card ${goal === g.id ? 'selected' : ''}`}
                    onClick={() => setGoal(g.id)}
                  >
                    <div className="goal-radio">
                      <div className="radio-inner"></div>
                    </div>
                    <div className="goal-text">
                      <strong>{g.title}</strong>
                      <p>{g.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="matcher-nav-row">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-back"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} /> <span>Back</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary btn-next"
                  onClick={() => setStep(3)}
                >
                  <span>Continue to Step 3</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Teaching Style & Schedule */}
          {step === 3 && !isScanning && (
            <div className="matcher-step-content">
              <h3>Step 3: What teaching style works best for your child?</h3>

              <div className="goals-options-grid styles-grid">
                {[
                  {
                    id: 'visual',
                    title: 'Visual & Interactive Whiteboard',
                    desc: 'Dynamic diagrams, color-coded notes, interactive animations, and step-by-step digital models.'
                  },
                  {
                    id: 'patient',
                    title: 'Patient, Encouraging & Structured',
                    desc: 'High empathy, gradual progression, positive reinforcement, and zero-judgment question solving.'
                  },
                  {
                    id: 'rigorous',
                    title: 'Fast-Paced, Rigorous & Direct',
                    desc: 'High-volume problem sets, timed drills, challenging extension problems, and fast feedback.'
                  }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`goal-card ${style === s.id ? 'selected' : ''}`}
                    onClick={() => setStyle(s.id)}
                  >
                    <div className="goal-radio">
                      <div className="radio-inner"></div>
                    </div>
                    <div className="goal-text">
                      <strong>{s.title}</strong>
                      <p>{s.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="matcher-nav-row">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-back"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft size={16} /> <span>Back</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary btn-next btn-scan"
                  onClick={handleStartScan}
                >
                  <Sparkles size={16} />
                  <span>Find My Matched Tutor</span>
                </button>
              </div>
            </div>
          )}

          {/* Scanning Animation State */}
          {isScanning && (
            <div className="matcher-scanning-state">
              <div className="radar-spinner">
                <div className="pulse-ring"></div>
                <Search size={32} className="radar-icon" />
              </div>
              <h3>Analyzing Pedagogical Fit...</h3>
              <p>Scanning 150+ accredited board examiners across UK, Dubai, Singapore & India for {subject} ({curriculum})...</p>
              <div className="scanning-bar">
                <div className="scanning-fill"></div>
              </div>
            </div>
          )}

          {/* Step 4: Matched Tutors Result View */}
          {step === 4 && (
            <div className="matcher-results-view">
              <div className="results-header">
                <div className="match-success-badge">
                  <CheckCircle2 size={16} /> Match Confirmed
                </div>
                <h3>We Found Your Top-Rated 1-on-1 Faculty!</h3>
                <p>Based on your criteria for <strong>{curriculum} • {subject}</strong>, these verified examiners are available for a free 45-minute trial:</p>
              </div>

              <div className="matched-tutors-grid">
                {matches.map((tutor, idx) => (
                  <div key={tutor.id} className="matched-tutor-card">
                    <div className="tutor-card-top">
                      <span className="match-score-pill">
                        ⭐ {idx === 0 ? '99%' : '97%'} Pedagogical Match
                      </span>
                    </div>

                    <div className="tutor-profile-header">
                      <img src={tutor.avatar} alt={tutor.name} className="tutor-avatar" />
                      <div className="tutor-names">
                        <h4>{tutor.name}</h4>
                        <span className="tutor-role">{tutor.role}</span>
                        <small className="tutor-cred">{tutor.credentials}</small>
                      </div>
                    </div>

                    <p className="tutor-bio">{tutor.highlight}</p>

                    <div className="tutor-stats-strip">
                      <div className="tutor-stat">
                        <Star size={14} className="star-icon" />
                        <strong>{tutor.rating}</strong>
                        <small>({tutor.reviewsCount} reviews)</small>
                      </div>
                      <div className="tutor-stat">
                        <Clock size={14} className="clock-icon" />
                        <strong>{tutor.hoursTaught}</strong>
                        <small>Hours Taught</small>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="btn btn-primary btn-full btn-book-tutor"
                      onClick={() => handleBookWithTutor(tutor)}
                    >
                      <span>Book Free Trial with {tutor.name.split(' ')[0]}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="matcher-results-footer">
                <button type="button" onClick={handleReset} className="btn-retake">
                  <RotateCcw size={14} /> Retake Matchmaker Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
