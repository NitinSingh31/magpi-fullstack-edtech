import React from 'react';
import './ComparisonTable.css';

const COMPARISON_ROWS = [
  {
    feature: '1-on-1 Attention',
    psittacus: 'Dedicated one-on-one sessions tailored to each learner’s pace',
    traditional: 'Group classes often dilute individual support'
  },
  {
    feature: 'Flexibility & Access',
    psittacus: 'Learn comfortably from anywhere with flexible time slots',
    traditional: 'Fixed timings and physical presence required'
  },
  {
    feature: 'Real-time Parent Updates',
    psittacus: 'Transparent communication and regular performance insights',
    traditional: 'Mostly restricted to scheduled parent meetings'
  },
  {
    feature: 'Curriculum-Specific Experts',
    psittacus: 'Tutors trained specifically in international curricula standards',
    traditional: 'Often, generalized teaching is not aligned with global boards'
  },
  {
    feature: 'Smart Learning Tools',
    psittacus: 'Engaging tools like adaptive quizzes, goal tracking & AI insights',
    traditional: 'Traditional whiteboard or book-based learning without digital support'
  }
];

export default function ComparisonTable() {
  return (
    <section className="psittacus-comparison-section" id="comparison">
      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">Psittacus Online Tuition VS Traditional Offline Tution</h2>
        </div>

        <div className="psittacus-table-container">
          <table className="psittacus-table">
            <thead>
              <tr>
                <th className="th-feature">Feature</th>
                <th className="th-psittacus">Psittacus Now Online Learning</th>
                <th className="th-traditional">Traditional Tuition Centers</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, index) => {
                const isDarkRow = index % 2 === 1;
                return (
                  <tr key={index} className={isDarkRow ? 'row-dark' : 'row-light'}>
                    <td className="cell-feature">
                      <strong>{row.feature}</strong>
                    </td>
                    <td className="cell-psittacus">{row.psittacus}</td>
                    <td className="cell-traditional">{row.traditional}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
