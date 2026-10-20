import React from 'react';
import { Target, UserCheck, Laptop, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import './Methodology.css';

const STEPS = [
  {
    step: '01',
    icon: <Target size={28} className="step-icon coral" />,
    title: 'Diagnostic Skill Audit',
    description: 'We evaluate past test scores, learning pacing, and concept blind-spots with a comprehensive 45-minute baseline diagnostic.'
  },
  {
    step: '02',
    icon: <UserCheck size={28} className="step-icon gold" />,
    title: 'Precision Tutor Matching',
    description: 'Matched with an accredited examiner or international university graduate who fits the student’s board syllabus and learning temperament.'
  },
  {
    step: '03',
    icon: <Laptop size={28} className="step-icon blue" />,
    title: 'Interactive Live Classrooms',
    description: '1-on-1 collaborative problem solving with interactive digital whiteboards, live code playgrounds, and instant session recordings.'
  },
  {
    step: '04',
    icon: <TrendingUp size={28} className="step-icon green" />,
    title: 'Continuous Mastery Tracking',
    description: 'Bi-weekly detailed performance reports, mock exam simulations under timed conditions, and dedicated academic mentor check-ins.'
  }
];

export default function Methodology({ onOpenDemo }) {
  return (
    <section className="section methodology-section" id="methodology">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag gold">
            <Sparkles size={14} /> The Magπ Advantage
          </div>
          <h2 className="section-title">
            Our Proven 4-Step Learning Methodology
          </h2>
          <p className="section-subtitle">
            We don’t just teach content; we build analytical thinkers. Our structured framework 
            turns hesitation into confidence and consistent grade excellence.
          </p>
        </div>

        <div className="steps-grid">
          {STEPS.map((item, index) => (
            <div key={index} className="step-card">
              <div className="step-number-pill">{item.step}</div>
              <div className="step-icon-box">{item.icon}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-description">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Methodology Bottom Banner */}
        <div className="methodology-banner">
          <div className="banner-text">
            <h3>Experience the difference in your child's first 45 minutes</h3>
            <p>No credit card required. Includes a complete diagnostic evaluation report.</p>
          </div>
          <button onClick={onOpenDemo} className="btn btn-primary btn-lg">
            <Sparkles size={18} /> Book Your Diagnostic Session
          </button>
        </div>
      </div>
    </section>
  );
}
