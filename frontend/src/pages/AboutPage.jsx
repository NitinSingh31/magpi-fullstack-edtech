import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  GraduationCap, 
  Globe2, 
  Calendar, 
  Wallet, 
  Target, 
  Compass, 
  Award, 
  Users, 
  CheckCircle, 
  Brain, 
  BookOpen, 
  Laptop,
  ArrowRight
} from 'lucide-react';
import './PagesCommon.css';
import './AboutPage.css';
import api from '../services/api.js';

const DEFAULT_FACULTY = [
  {
    name: "Dr. Elena Vance",
    role: "Head of Sciences & IB DP Advisor",
    credentials: "Ph.D. Oxford, 14+ Years CAIE & IB Examiner",
    subjects: "Physics HL & Chemistry SL/HL",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Prof. Marcus Thorne",
    role: "Lead Faculty – Mathematics & AP Prep",
    credentials: "M.Sc. Imperial College London, 11+ Years",
    subjects: "Pure Math, AP Calculus BC & IB Math AA",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Sunita Rao",
    role: "Director of Pedagogy & Olympiad Aptitude",
    credentials: "M.Ed. Harvard GSE, IMO National Coach",
    subjects: "Olympiad Math, Vedic Calculation & STEM",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Liam Chen",
    role: "Head of Tech & Future Skills Lab",
    credentials: "B.S. CS UC Berkeley, Former Tech Lead",
    subjects: "Python, AI / Machine Learning & Web Dev",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  }
];

export default function AboutPage({ onOpenDemo }) {
  const [facultyMembers, setFacultyMembers] = useState(DEFAULT_FACULTY);

  useEffect(() => {
    let isMounted = true;
    api.getLeadership({ activeOnly: true })
      .then(res => {
        if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setFacultyMembers(res.data);
        }
      })
      .catch(err => {
        console.warn('[AboutPage] Could not load dynamic leadership, using defaults:', err.message);
      });
    return () => { isMounted = false; };
  }, []);
  const coreValues = [
    {
      icon: <Users size={28} />,
      title: "Personal Attention",
      desc: "Every child is paired with a dedicated tutor who customizes each 1-on-1 session to their specific learning style and pace."
    },
    {
      icon: <Target size={28} />,
      title: "Holistic Development",
      desc: "We focus on academic grade elevation while simultaneously instilling critical thinking, problem-solving, and communication."
    },
    {
      icon: <Compass size={28} />,
      title: "Lifelong Learning",
      desc: "Encouraging curiosity that extends far beyond exams, preparing young minds for tomorrow's complex world."
    },
    {
      icon: <Brain size={28} />,
      title: "Adaptive Agility",
      desc: "Dynamic lesson pacing that swiftly adjusts whenever a student grasps a concept early or needs deeper foundation work."
    },
    {
      icon: <Award size={28} />,
      title: "Academic Excellence",
      desc: "Delivering measurable grade improvements with 94.2% of our students achieving A*/A in Cambridge and 6/7 in IB."
    },
    {
      icon: <Laptop size={28} />,
      title: "Tech Innovation",
      desc: "Using interactive digital whiteboards, real-time code sandboxes, and AI-assisted diagnostic skill audits."
    }
  ];

  const trustPillars = [
    {
      icon: "🎓",
      title: "Qualified & Experienced",
      desc: "Trained professionals with a minimum of 6+ years verified classroom & international board teaching experience."
    },
    {
      icon: "🌐",
      title: "Board-Specific Experts",
      desc: "Certified examiners and senior faculty well-versed in Cambridge CAIE, Edexcel, IB DP/MYP, SABIS, AP & CBSE."
    },
    {
      icon: "🏫",
      title: "Top-Tier University Alumni",
      desc: "Educators holding advanced degrees (Masters & Ph.D.) from premier global universities."
    },
    {
      icon: "💻",
      title: "Tech-Fluent Classrooms",
      desc: "Skilled in dual-camera visualizers, digital math sketchpads, and collaborative virtual whiteboards."
    },
    {
      icon: "🧠",
      title: "Student-Centered Approach",
      desc: "We adapt teaching methodologies to each learner rather than forcing students into a rigid generic syllabus."
    },
    {
      icon: "💬",
      title: "Mentorship Beyond Exams",
      desc: "Nurturing self-confidence, stress management during exam seasons, and guidance for college applications."
    }
  ];

  return (
    <div className="about-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">About Us</span>
          </div>
          <div className="page-hero-badge">
            <Sparkles size={14} /> Get to Know Magπ
          </div>
          <h1 className="page-hero-title">
            Fueling Student Growth for <span className="text-highlight">Tomorrow’s Challenges</span>
          </h1>
          <p className="page-hero-desc">
            Magπ is a next-generation 1-on-1 and group online learning platform built on curiosity, adaptability, and intellectual excellence. We empower young scholars across global boards like IGCSE, IB, SABIS, and A & AS Level.
          </p>
          <div className="page-hero-actions">
            <button onClick={() => onOpenDemo()} className="btn btn-primary">
              <Sparkles size={16} /> Book a Free Demo
            </button>
            <Link to="/online-tuition" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Explore Our Curriculums <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><GraduationCap size={22} /></div>
              <div>
                <strong>Highly Experienced Instructors</strong>
                <span>Certified educators with 8+ yrs avg tenure</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Globe2 size={22} /></div>
              <div>
                <strong>Access Classes Anywhere</strong>
                <span>Global 1-on-1 sessions tailored to your timezone</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Calendar size={22} /></div>
              <div>
                <strong>Flexible Course Plans</strong>
                <span>Zero rigid schedules; reschedule with ease</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Wallet size={22} /></div>
              <div>
                <strong>Transparent Pricing</strong>
                <span>Pay per class or modular terms with no hidden lock-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Inspiration Behind Magπ */}
      <section className="page-section inspiration-section">
        <div className="container">
          <div className="inspiration-grid">
            <div className="inspiration-content">
              <div className="badge-tag brand">Origin Story</div>
              <h2 className="section-title">The Philosophy of Magπ</h2>
              <p className="inspiration-text">
                Our name and brand identity draw deep inspiration from the <strong>Magpie</strong> — recognized by cognitive scientists as one of the most intelligent, inquisitive, and self-aware creatures in the animal kingdom.
              </p>
              <p className="inspiration-text">
                Combined with the mathematical constant <strong>π (Pi)</strong> — representing infinity, precision, and boundless discovery — <strong>Magπ</strong> symbolizes the continuous evolution of a young scholar’s mind.
              </p>
              <p className="inspiration-text">
                At <strong>Magπ</strong>, we don't believe in rote memorization; we train students to think critically, deduce solutions, and solve complex problems autonomously across international curricula.
              </p>
              <div className="inspiration-stats-row">
                <div className="inspire-stat">
                  <strong>2026</strong>
                  <span>Year Founded</span>
                </div>
                <div className="inspire-stat">
                  <strong>12.5K+</strong>
                  <span>Students Elevated</span>
                </div>
                <div className="inspire-stat">
                  <strong>12+</strong>
                  <span>Countries Served</span>
                </div>
              </div>
            </div>
            <div className="inspiration-media">
              <div className="inspiration-card-visual">
                <img 
                  src="/assets/magpi-logo.png" 
                  alt="Magπ Emblem" 
                  className="inspiration-mascot-img"
                  style={{ maxHeight: '180px', objectFit: 'contain' }}
                />
                <div className="mascot-tag-pill">
                  <Brain size={18} />
                  <span>Cognitive Mastery & Problem Solving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission, Vision, and STEAM Approach */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="mission-icon-box"><Target size={30} /></div>
              <h3>Our Mission</h3>
              <p>
                To make personalized, affordable, and globally competitive education accessible to every ambitious student. We help learners elevate not only their school grades but also their intrinsic problem-solving abilities, self-confidence, and intellectual curiosity.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon-box"><Compass size={30} /></div>
              <h3>Our Vision</h3>
              <p>
                To build a world-class global learning community where young minds are inspired to become lifelong learners, equipped with both academic mastery and the mental resilience required to excel in a rapidly evolving technological society.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon-box"><BookOpen size={30} /></div>
              <h3>Our STEAM Approach</h3>
              <p>
                We integrate academic rigor with hands-on STEAM principles (Science, Technology, Engineering, Arts, and Math). Every single lesson connects theoretical syllabus concepts with real-world applications, keeping students engaged and motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">What Drives Us</div>
            <h2>Our Core Values</h2>
            <p>
              At Magπ, our values aren't just decorative words. They guide every lesson plan we prepare, every tutor we onboard, and every milestone we celebrate with parents.
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-item-card">
                <div className="value-icon">{val.icon}</div>
                <h4>{val.title}</h4>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Parents Trust Our Tutors & Faculty */}
      <section className="page-section alt-bg" id="faculty">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Vetted Excellence</div>
            <h2>Why Parents Trust Our Tutors</h2>
            <p>
              We accept fewer than 1.8% of global tutor applicants. Every Magπ educator goes through a rigorous 5-stage vetting procedure.
            </p>
          </div>

          <div className="trust-grid">
            {trustPillars.map((pillar, idx) => (
              <div key={idx} className="trust-card">
                <div className="trust-emoji">{pillar.icon}</div>
                <div className="trust-content">
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Faculty Spotlight */}
      <section className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Academic Leadership</div>
            <h2>Meet Our Academic Leadership</h2>
            <p>
              Guided by career educators, curriculum directors, and board examiners with decades of proven success.
            </p>
          </div>

          <div className="faculty-grid">
            {facultyMembers.map((fac, idx) => (
              <div key={idx} className="faculty-card">
                <div className="faculty-img-wrapper">
                  <img src={fac.image} alt={fac.name} className="faculty-img" />
                </div>
                <div className="faculty-info">
                  <h4>{fac.name}</h4>
                  <div className="faculty-role">{fac.role}</div>
                  <div className="faculty-creds">{fac.credentials}</div>
                  <div className="faculty-subjects">
                    <strong>Specializes in:</strong> {fac.subjects}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="page-cta-banner">
        <div className="container cta-content-wrapper">
          <h2>Ready to Elevate Your Child’s Learning?</h2>
          <p>
            Experience the Magπ difference with a 45-minute zero-risk trial session. Diagnostic assessment included.
          </p>
          <div className="cta-actions">
            <button onClick={() => onOpenDemo()} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book a Free Demo Today
            </button>
            <Link to="/contact-us" className="btn btn-secondary btn-lg">
              Contact Academic Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
