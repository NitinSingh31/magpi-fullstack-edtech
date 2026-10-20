import React from 'react';
import { COMPARISON_DATA } from '../data/coursesData';
import { Check, X, Sparkles, Scale } from 'lucide-react';
import './ComparisonTable.css';

export default function ComparisonTable({ onOpenDemo }) {
  return (
    <section className="section comparison-section" id="comparison">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag blue">
            <Scale size={14} /> Clear Side-by-Side Value
          </div>
          <h2 className="section-title">
            Magπ Online Tuition VS Traditional Offline Tuition
          </h2>
          <p className="section-subtitle">
            See why personalized 1-on-1 online tutoring delivers superior results, higher retention, 
            and zero commute fatigue compared to conventional crowded coaching centers.
          </p>
        </div>

        <div className="table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Key Feature</th>
                <th className="magpi-col">
                  <div className="col-header-badge">Recommended</div>
                  <span className="col-title">Mag<span className="brand-pi">π</span> 1-on-1 Academy</span>
                </th>
                <th className="other-col">
                  <span className="col-title">Traditional Coaching Centers</span>
                </th>
                <th className="other-col">
                  <span className="col-title">Generic Video Learning Apps</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, index) => (
                <tr key={index}>
                  <td className="feature-cell">
                    <strong>{row.feature}</strong>
                  </td>
                  <td className="magpi-cell">
                    <div className="cell-content">
                      <div className="status-icon success">
                        <Check size={14} />
                      </div>
                      <span>{row.magpi}</span>
                    </div>
                  </td>
                  <td className="other-cell">
                    <div className="cell-content">
                      <div className="status-icon danger">
                        <X size={14} />
                      </div>
                      <span>{row.offline}</span>
                    </div>
                  </td>
                  <td className="other-cell">
                    <div className="cell-content">
                      <div className="status-icon danger">
                        <X size={14} />
                      </div>
                      <span>{row.genericVideo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comparison-cta-box">
          <p>Ready to give your child an unfair academic advantage?</p>
          <button onClick={onOpenDemo} className="btn btn-primary">
            <Sparkles size={16} /> Book Your 45-Min Free Assessment
          </button>
        </div>
      </div>
    </section>
  );
}
