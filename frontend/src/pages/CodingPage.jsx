import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Layers, 
  Globe2, 
  CheckCircle2, 
  FolderGit2, 
  Laptop,
  ArrowRight,
  BrainCircuit,
  Bot
} from 'lucide-react';
import './PagesCommon.css';
import './SkillPages.css';

export default function CodingPage({ onOpenDemo }) {
  const tracks = [
    {
      title: "Scratch & Game Logic for Young Coders",
      ageGroup: "Ages 7 - 10 (Beginners)",
      badge: "Visual Block Coding",
      summary: "Ignite a passion for computational thinking by creating interactive video games, animations, and arcade puzzles.",
      modules: [
        "Sequence, loops, nested conditionals & event-driven architecture",
        "Variables, game scoring systems, and multi-level design",
        "Collision detection, character physics & gravity algorithms",
        "Publishing playable games to the Psittacus online student arcade"
      ],
      outcome: "Build 8+ complete arcade games with zero prior coding experience"
    },
    {
      title: "Python Programming & Algorithmic Thinking",
      ageGroup: "Ages 11 - 16 (Foundation to Advanced)",
      badge: "Industry Standard Language",
      summary: "Learn the world's most versatile programming language with real code syntax, data structures, and Pygame builds.",
      modules: [
        "Python core syntax, data types, functions & recursion",
        "Object-Oriented Programming (OOP: Classes, Inheritance, Encapsulation)",
        "File I/O, API consumption & data handling with JSON",
        "Algorithm design: searching, sorting & Big-O efficiency"
      ],
      outcome: "Create desktop GUI tools and certified competitive programming projects"
    },
    {
      title: "Full-Stack Web Development & Modern JS",
      ageGroup: "Ages 12 - 18",
      badge: "Real-World Engineering",
      summary: "Build, design, and deploy production websites using HTML5, modern CSS, JavaScript ES6+, and React.",
      modules: [
        "Semantic HTML5, Flexbox & CSS Grid responsive layouts",
        "Modern JavaScript: DOM manipulation, async/await, Fetch APIs",
        "Component architecture with React 18 and state management",
        "Git version control, GitHub portfolio & live Netlify/Vercel deployment"
      ],
      outcome: "Launch live web applications that impress college admissions panels"
    },
    {
      title: "Artificial Intelligence & Data Science Lab",
      ageGroup: "Ages 13 - 18",
      badge: "Future Frontier",
      summary: "Demystify machine learning, neural networks, and computer vision with practical Python projects and ethical AI insights.",
      modules: [
        "Data science foundations with NumPy, Pandas & Matplotlib",
        "Computer Vision & Face/Object detection with OpenCV",
        "Supervised vs Unsupervised machine learning models",
        "Prompt engineering, LLM integrations & AI safety ethics"
      ],
      outcome: "Train and deploy custom AI models that solve real-world problems"
    }
  ];

  return (
    <div className="skill-page coding-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Skill Courses</span>
            <span>/</span>
            <span className="active">Coding & Programming</span>
          </div>
          <div className="page-hero-badge">
            <Code size={14} /> Future Skills Lab
          </div>
          <h1 className="page-hero-title">
            Empower Young Minds with <span className="text-highlight">Real Coding & AI Skills</span>
          </h1>
          <p className="page-hero-desc">
            From crafting creative video games in Scratch to building production-grade web apps and neural networks in Python. Practical, hands-on 1-on-1 mentorship by Silicon Valley and top tech university alumni.
          </p>
          <div className="page-hero-actions">
            <button onClick={() => onOpenDemo('Coding & AI Lab')} className="btn btn-primary">
              <Sparkles size={16} /> Book Free 1-on-1 Coding Trial
            </button>
            <a href="#tracks" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Explore Coding Pathways <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Terminal size={22} /></div>
              <div>
                <strong>Live In-Browser Code Sandboxes</strong>
                <span>No complex software installation needed to start coding</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><FolderGit2 size={22} /></div>
              <div>
                <strong>Public GitHub Project Portfolio</strong>
                <span>Tangible proof of coding skills for college applications</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Bot size={22} /></div>
              <div>
                <strong>AI-Assisted Debugging Support</strong>
                <span>Instant guidance when syntax errors or bugs arise</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Cpu size={22} /></div>
              <div>
                <strong>Capstone Certification</strong>
                <span>Official Psittacus Tech Excellence Credential upon completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Program Tracks */}
      <section id="tracks" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Learning Pathways</div>
            <h2>Structured Tech Pathways from Beginner to Pro</h2>
            <p>
              Every pathway is designed to progress from fundamental syntax to complex independent capstone projects.
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
                  <h4>Key Competencies Mastered:</h4>
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
                  <strong>Portfolio Outcome:</strong> {track.outcome}
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

      {/* 4. Interactive Live Sandbox Preview */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="code-showcase-box">
            <div className="code-header-bar">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-filename">ai_vision_detector.py — Psittacus Coding Lab</span>
            </div>
            <pre className="code-content">
{`# Psittacus Future Skills Lab — AI Computer Vision Project (Ages 13+)
import cv2
import numpy as np

def detect_pi_mentor_scholar(frame):
    # Initialize real-time cognitive model
    model = MagPiVisionNeuralNet.load_pretrained('stem_genius_v2')
    detections = model.predict(frame)
    
    for student in detections:
        print(f"Verified Scholar: {student.name} | Mastery: {student.grade_elevation}%")
        student.celebrate_achievement(confetti=True)

# 1-on-1 interactive coding with real-time mentor screen sharing`}
            </pre>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="page-cta-banner">
        <div className="container cta-content-wrapper">
          <h2>Start Building Real Software Today</h2>
          <p>
            Book a 45-minute zero-cost 1-on-1 coding trial. Our mentor will guide your child through creating their first live playable project in class.
          </p>
          <div className="cta-actions">
            <button onClick={() => onOpenDemo('Coding & AI Class')} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book Free Coding Trial Session
            </button>
            <Link to="/contact-us" className="btn btn-secondary btn-lg">
              Talk to Tech Faculty
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
