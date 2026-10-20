import React, { useState } from 'react';
import { Globe2, Clock, CheckCircle2 } from 'lucide-react';
import './GlobalReach.css';

const COUNTRIES = [
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', students: '420+ Students', timezone: 'GST (UTC+4)', popular: 'IGCSE & IB Math' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', students: '380+ Students', timezone: 'GMT / BST (UTC+0)', popular: 'GCSE, A-Levels & Coding' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', students: '290+ Students', timezone: 'SGT (UTC+8)', popular: 'Olympiad & Python AI' },
  { name: 'United States', code: 'US', flag: '🇺🇸', students: '340+ Students', timezone: 'EST & PST', popular: 'AP Calculus & STEAM' },
  { name: 'India', code: 'IN', flag: '🇮🇳', students: '650+ Students', timezone: 'IST (UTC+5:30)', popular: 'CBSE, ICSE & SAT Prep' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', students: '180+ Students', timezone: 'AST (UTC+3)', popular: 'SABIS & Cambridge IGCSE' },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦', students: '140+ Students', timezone: 'AST (UTC+3)', popular: 'British & American Diploma' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', students: '160+ Students', timezone: 'AEST (UTC+10)', popular: 'IB DP & Languages' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', students: '170+ Students', timezone: 'EST & CST', popular: 'High School Math & AI' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', students: '110+ Students', timezone: 'CET (UTC+1)', popular: 'German & IB Physics' }
];

export default function GlobalReach() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  return (
    <section className="section global-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag blue">
            <Globe2 size={14} /> International Academy
          </div>
          <h2 className="section-title">
            Seamless Tutoring Across 18+ Countries & Timezones
          </h2>
          <p className="section-subtitle">
            Whether you are located in London, Dubai, Singapore, or New York, our educators 
            are scheduled around your family’s routine with zero timezone friction.
          </p>
        </div>

        {/* Global Showcase Grid */}
        <div className="global-grid">
          {/* Countries Selector Column */}
          <div className="countries-list-card">
            <h4 className="card-headline">Active Learning Hubs</h4>
            <div className="countries-scroll-list">
              {COUNTRIES.map((country, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCountry(country)}
                  className={`country-item-btn ${selectedCountry.name === country.name ? 'active' : ''}`}
                >
                  <span className="c-flag">{country.flag}</span>
                  <div className="c-meta">
                    <strong className="c-name">{country.name}</strong>
                    <span className="c-sub">{country.timezone}</span>
                  </div>
                  <span className="c-students">{country.students}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Country Detail Highlight */}
          <div className="country-spotlight-card">
            <div className="spotlight-header">
              <span className="big-flag">{selectedCountry.flag}</span>
              <div>
                <span className="spotlight-badge">Selected Region</span>
                <h3>{selectedCountry.name}</h3>
                <p className="spotlight-tz"><Clock size={14} /> Native Timezone: <strong>{selectedCountry.timezone}</strong></p>
              </div>
            </div>

            <div className="spotlight-body">
              <div className="spotlight-stat-box">
                <span className="stat-label">Active Learners</span>
                <h4 className="stat-num">{selectedCountry.students}</h4>
              </div>

              <div className="spotlight-stat-box">
                <span className="stat-label">Most In-Demand Subjects</span>
                <h4 className="stat-num">{selectedCountry.popular}</h4>
              </div>
            </div>

            <div className="spotlight-features">
              <div className="spotlight-feature-row">
                <CheckCircle2 size={18} className="feat-icon green" />
                <span>Examiner-vetted curriculum alignment tailored to local school systems</span>
              </div>
              <div className="spotlight-feature-row">
                <CheckCircle2 size={18} className="feat-icon green" />
                <span>Flexible morning, after-school, and weekend slots in {selectedCountry.timezone}</span>
              </div>
              <div className="spotlight-feature-row">
                <CheckCircle2 size={18} className="feat-icon green" />
                <span>Localized parent payment options (USD, GBP, AED, EUR, SGD, INR)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
