import React from 'react';
import { Clock, Award, Star, Globe2, BookOpen } from 'lucide-react';
import './StatsBar.css';

const STATS = [
  {
    icon: <Clock size={28} className="stat-icon coral" />,
    value: '12.5K+',
    label: 'Total Enrolled Students',
    sublabel: 'Across 18+ countries'
  },
  {
    icon: <Award size={28} className="stat-icon gold" />,
    value: '250+',
    label: 'Certified Global Tutors',
    sublabel: 'Top 1% examiner network'
  },
  {
    icon: <BookOpen size={28} className="stat-icon blue" />,
    value: '50+',
    label: 'Specialized Courses',
    sublabel: 'Academics, STEAM & Skills'
  },
  {
    icon: <Star size={28} className="stat-icon green" />,
    value: '98.4%',
    label: 'Satisfaction Rate',
    sublabel: 'Proven grade elevation'
  }
];

export default function StatsBar() {
  return (
    <div className="stats-section">
      <div className="container">
        <div className="stats-bar-card">
          <div className="stats-grid">
            {STATS.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                  <span className="stat-sublabel">{stat.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
