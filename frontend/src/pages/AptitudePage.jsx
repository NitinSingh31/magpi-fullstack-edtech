import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Trophy, 
  Compass, 
  CheckCircle2, 
  Target, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import './PagesCommon.css';
import './SkillPages.css';

export default function AptitudePage({ onOpenDemo }) {
  const tracks = [
    {
      title: "Vedic Mental Mathematics & Rapid Calculation",
      ageGroup: "Ages 8 - 16",
      badge: "Speed Math",
      summary: "Perform complex multi-digit multiplications, divisions, and square roots in seconds entirely in your head without paper.",
      modules: [
        "Sutras of Vedic Mathematics (Urdhva Tiryagbhyam, Nikhilam, etc.)",
        "Instant multiplication of 3-digit by 3-digit numbers in 5 seconds",
        "Fast percentage calculations & decimal conversions",
        "Mental cross-checking techniques to eliminate silly calculation errors"
      ],
      outcome: "Solve math calculations 5x faster than school peers"
    },
    {
      title: "International Math Olympiad (IMO & AMC Prep)",
      ageGroup: "Grades 3 - 12 (Junior & Senior Tiers)",
      badge: "Competitive Excellence",
      summary: "Specialized coaching for IMO, AMC 8/10/12, SASMO, and Southeast Asian Math Olympiad championships.",
      modules: [
        "Combinatorics, Pigeonhole Principle & Modular Arithmetic",
        "Non-routine Euclidean Geometry & circle theorems",
        "Algebraic manipulations, functional equations & inequalities",
        "Past Olympiad paper drilling with national problem setter mentors"
      ],
      outcome: "Win medals and distinction certificates in global contests"
    },
    {
      title: "Logical Reasoning & Cognitive Aptitude",
      ageGroup: "Ages 9 - 18",
      badge: "Critical Thinking",
      summary: "Sharpen cognitive agility, pattern recognition, syllogistic reasoning, and spatial visualization.",
      modules: [
        "Verbal reasoning: Analogies, blood relations & directional puzzles",
        "Non-verbal reasoning: Matrix patterns, mirror images & paper folding",
        "Cryptarithmetic, logical deductions & truth-teller paradoxes",
        "Preparation for school gifted-and-talented and competitive aptitude exams"
      ],
      outcome: "Achieve top percentiles in cognitive ability tests (CAT4 / CogAT)"
    },
    {
      title: "STEM Foundation & Quantitative Problem Solving",
      ageGroup: "Grades 6 - 10",
      badge: "STEM Architecture",
      summary: "Bridge textbook formulas into deep physical and intuitive understanding of numbers, ratios, and scientific laws.",
      modules: [
        "Real-world modeling of algebra in physics and architecture",
        "Data interpretation, chart decoding & statistical deductions",
        "Scientific inquiry: isolating variables and testing hypotheses",
        "Building academic curiosity for future engineering and finance careers"
      ],
      outcome: "Unshakeable mathematical confidence for senior high school"
    }
  ];

  return (
    <div className="skill-page aptitude-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Skill Courses</span>
            <span>/</span>
            <span className="active">Reasoning & Aptitude</span>
          </div>
          <div className="page-hero-badge">
            <Brain size={14} /> Cognitive Genius Lab
          </div>
          <h1 className="page-hero-title">
            Sharp Minds: <span className="text-highlight">Speed Math & Olympiad Reasoning</span>
          </h1>
          <p className="page-hero-desc">
            Develop lightning-fast mental arithmetic, conquer prestigious International Math Olympiads, and master high-order logical thinking. Mentored by national medalists and premier math educators.
          </p>
          <div className="page-hero-actions">
            <button onClick={() => onOpenDemo('Reasoning & Aptitude')} className="btn btn-primary">
              <Sparkles size={16} /> Book Free Diagnostic Aptitude Audit
            </button>
            <a href="#tracks" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              View Aptitude Programs <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Zap size={22} /></div>
              <div>
                <strong>5x Calculation Velocity</strong>
                <span>Solve arithmetic without paper or calculator</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Trophy size={22} /></div>
              <div>
                <strong>Olympiad Medalist Mentors</strong>
                <span>Learn directly from IMO and AMC top scorers</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Compass size={22} /></div>
              <div>
                <strong>CAT4 / CogAT Test Preparation</strong>
                <span>Diagnostic readiness for gifted school programs</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Award size={22} /></div>
              <div>
                <strong>Eliminate Math Anxiety</strong>
                <span>Transform numbers into joyful cognitive games</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Program Tracks */}
      <section id="tracks" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Cognitive Tracks</div>
            <h2>Specialized Reasoning & Aptitude Pathways</h2>
            <p>
              Designed to train brain agility, out-of-the-box deduction, and competitive problem-solving.
            </p>
          </div>

          <div className="skill-tracks-grid">
            {tracks.map((track, idx) => (
              <div key={idx} className="track-card">
                <div className="track-top-meta">
                  <span className="track-age-pill">{track.ageGroup}</span>
                  <span className="track-badge-mini">{track.badge}</span>
                </div>
                <h3 className="track-title">{track.title}</h3>
                <p className="track-summary">{track.summary}</p>

                <div className="track-modules">
                  <h4>Core Capabilities Trained:</h4>
                  <ul>
                    {track.modules.map((m, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="track-check" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="track-outcome-box">
                  <strong>Expected Benchmark:</strong> {track.outcome}
                </div>

                <button 
                  onClick={() => onOpenDemo(track.title)} 
                  className="btn btn-outline btn-block"
                >
                  <Sparkles size={16} /> Book Trial for this Pathway
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Brain Gym Framework */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Cognitive Science</div>
            <h2>The Magπ Brain Gym Architecture</h2>
            <p>
              How our brain-training exercises expand working memory and cognitive processing speed.
            </p>
          </div>

          <div className="oratory-pillars-grid">
            <div className="oratory-card">
              <div className="pillar-num">01</div>
              <h4>Working Memory Expansion</h4>
              <p>Mental multi-step calculation trains the prefrontal cortex, helping students hold multiple variables simultaneously in exams.</p>
            </div>
            <div className="oratory-card">
              <div className="pillar-num">02</div>
              <h4>Heuristic Pattern Recognition</h4>
              <p>Students learn to categorize unfamiliar Olympiad problems into recognizable mathematical architectures in under 30 seconds.</p>
            </div>
            <div className="oratory-card">
              <div className="pillar-num">03</div>
              <h4>Stress Immunity & Focus</h4>
              <p>Timed gamified puzzles condition scholars to remain calm, analytical, and methodical under strict examination time pressures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="page-cta-banner">
        <div className="container cta-content-wrapper">
          <h2>Test Your Child’s Aptitude with Our Senior Mentors</h2>
          <p>
            Book a complimentary 45-minute baseline diagnostic session. We will identify cognitive strengths and areas for speed elevation.
          </p>
          <div className="cta-actions">
            <button onClick={() => onOpenDemo('Reasoning & Aptitude')} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book Free Diagnostic Audit
            </button>
            <Link to="/contact-us" className="btn btn-secondary btn-lg">
              Speak with Math Advisors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
