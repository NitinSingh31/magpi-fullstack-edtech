import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Percent,
  Layers
} from 'lucide-react';
import './TuitionCalculator.css';

const CURRICULUM_RATES = {
  'Cambridge IGCSE': { base: 36, name: 'Cambridge IGCSE / GCSE', tag: 'Grades 9-10' },
  'IB MYP / DP': { base: 46, name: 'IB Diploma (DP) & MYP', tag: 'Standard & Higher Level' },
  'AS & A-Levels': { base: 44, name: 'Cambridge & Edexcel A-Levels', tag: 'Grades 11-12' },
  'US Common Core / AP': { base: 42, name: 'US Curriculum & AP Prep', tag: 'College Board Aligned' },
  'STEAM & AI Coding': { base: 38, name: 'STEAM, Python & AI Labs', tag: 'Ages 8-18' },
  'Global Languages': { base: 34, name: 'French, Spanish & German', tag: 'DELF / DELE Prep' }
};

const TIERS = {
  mentor: { name: 'Senior Mentor', multiplier: 1.0, desc: 'Accredited specialist with 3+ years proven student track record.' },
  examiner: { name: 'Master Examiner Tier', multiplier: 1.25, desc: 'Official Cambridge/IB Board examiner or Ivy/Oxbridge alumnus.' }
};

const COMMITMENT_OPTIONS = [
  { hours: 2, label: '2 hrs / week', totalMonth: 8, discount: 0, tag: 'Steady Pace' },
  { hours: 4, label: '4 hrs / week', totalMonth: 16, discount: 0.10, tag: 'Most Popular', popular: true },
  { hours: 6, label: '6 hrs / week', totalMonth: 24, discount: 0.18, tag: 'Exam Fast-Track' },
  { hours: 8, label: '8 hrs / week', totalMonth: 32, discount: 0.22, tag: 'Comprehensive Double-Subject' }
];

export default function TuitionCalculator({ onOpenDemo }) {
  const [selectedCurriculum, setSelectedCurriculum] = useState('Cambridge IGCSE');
  const [selectedTier, setSelectedTier] = useState('mentor');
  const [commitmentIndex, setCommitmentIndex] = useState(1); // default 4 hrs/week

  const curriculumData = CURRICULUM_RATES[selectedCurriculum];
  const tierData = TIERS[selectedTier];
  const commitment = COMMITMENT_OPTIONS[commitmentIndex];

  // Price calculations
  const rawHourlyRate = Math.round(curriculumData.base * tierData.multiplier);
  const effectiveHourlyRate = Math.round(rawHourlyRate * (1 - commitment.discount));
  const monthlyTotal = effectiveHourlyRate * commitment.totalMonth;
  const standardMonthly = rawHourlyRate * commitment.totalMonth;
  const monthlySavings = standardMonthly - monthlyTotal;

  const handleClaimPackage = () => {
    if (onOpenDemo) {
      onOpenDemo(`${selectedCurriculum} - ${commitment.label} (${tierData.name})`);
    }
  };

  return (
    <section className="section tuition-calculator-section" id="pricing-calculator">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="badge-tag blue">
            <Calculator size={14} /> Transparent Global Tuition
          </div>
          <h2 className="section-title">
            Tuition Investment & <span className="highlight-text">Package Savings</span>
          </h2>
          <p className="section-subtitle">
            No lock-in contracts. Transparent 1-on-1 private tuition with verified board examiners. 
            Customize your hours and save up to 22% with our monthly mastery bundles.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="calculator-container">
          <div className="calculator-controls">
            {/* 1. Select Board */}
            <div className="calc-group">
              <label className="calc-label">
                <span className="step-num">1</span> Select Curriculum / Stream
              </label>
              <div className="curriculum-grid">
                {Object.entries(CURRICULUM_RATES).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={`curr-btn ${selectedCurriculum === key ? 'active' : ''}`}
                    onClick={() => setSelectedCurriculum(key)}
                  >
                    <strong>{item.name}</strong>
                    <small>{item.tag}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Educator Tier */}
            <div className="calc-group">
              <label className="calc-label">
                <span className="step-num">2</span> Educator Expertise Level
              </label>
              <div className="tier-selector">
                {Object.entries(TIERS).map(([key, item]) => (
                  <label 
                    key={key} 
                    className={`tier-card ${selectedTier === key ? 'active' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="tutorTier" 
                      value={key} 
                      checked={selectedTier === key}
                      onChange={() => setSelectedTier(key)}
                    />
                    <div className="tier-content">
                      <div className="tier-top">
                        <strong>{item.name}</strong>
                        {key === 'examiner' && (
                          <span className="examiner-pill">
                            <Award size={12} /> Certified Examiner
                          </span>
                        )}
                      </div>
                      <p>{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Hours Commitment */}
            <div className="calc-group">
              <div className="commitment-header">
                <label className="calc-label">
                  <span className="step-num">3</span> Weekly Learning Commitment
                </label>
                <span className="hours-callout">{commitment.hours} Hours / Week (~{commitment.totalMonth} hrs/mo)</span>
              </div>

              <div className="commitment-slider-wrap">
                <div className="commitment-buttons">
                  {COMMITMENT_OPTIONS.map((opt, idx) => (
                    <button
                      key={opt.hours}
                      type="button"
                      className={`commit-btn ${commitmentIndex === idx ? 'active' : ''}`}
                      onClick={() => setCommitmentIndex(idx)}
                    >
                      {opt.popular && <span className="pop-badge">⭐ Recommended</span>}
                      <strong>{opt.label}</strong>
                      <small>{opt.tag}</small>
                      {opt.discount > 0 && (
                        <span className="discount-tag">Save {opt.discount * 100}%</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="calculator-result-card">
            <div className="result-badge">
              <Sparkles size={14} /> Estimated Investment
            </div>

            <div className="price-display-group">
              <div className="hourly-rate-row">
                <span className="rate-num">${effectiveHourlyRate}</span>
                <span className="rate-unit">/ hour</span>
                {commitment.discount > 0 && (
                  <span className="strike-rate">${rawHourlyRate}</span>
                )}
              </div>
              <p className="rate-caption">
                Private 1-on-1 sessions • Billed monthly (~{commitment.totalMonth} hours)
              </p>
            </div>

            <div className="monthly-total-box">
              <div className="monthly-row">
                <span>Estimated Monthly Tuition:</span>
                <strong>${monthlyTotal}</strong>
              </div>
              {monthlySavings > 0 && (
                <div className="savings-badge">
                  <Percent size={14} />
                  <span>You Save <strong>${monthlySavings}/month</strong> ({commitment.discount * 100}% bundle savings)</span>
                </div>
              )}
            </div>

            {/* Included in every plan */}
            <div className="included-features">
              <span className="included-title">What is Included in Every Session:</span>
              <ul className="feature-checklist">
                <li>
                  <CheckCircle2 size={15} className="check-icon" />
                  <span>Personalized 1-on-1 Live Class with whiteboard</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="check-icon" />
                  <span>Full Session Video Recordings & Annotated PDF Notes</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="check-icon" />
                  <span>Weekly Detailed Academic Diagnostics & Progress Tracker</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="check-icon" />
                  <span>24/7 WhatsApp Doubt-Clearing with Mentor</span>
                </li>
              </ul>
            </div>

            <button 
              type="button" 
              className="btn btn-primary btn-full btn-claim"
              onClick={handleClaimPackage}
            >
              <span>Book Free 45-Min Trial Class</span>
              <ArrowRight size={16} />
            </button>

            <div className="calc-guarantee">
              <ShieldCheck size={14} color="#10B981" />
              <span>100% Free Initial Trial • No Credit Card Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
