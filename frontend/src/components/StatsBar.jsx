import React from 'react';
import './StatsBar.css';
import { useSiteMedia } from '../context/MediaContext';

export default function StatsBar() {
  const { getMedia } = useSiteMedia();

  return (
    <section className="psittacus-stats-banner">
      <div className="container stats-banner-inner">
        <div className="stats-counters-group">
          <div className="stat-counter-item">
            <span className="stat-number">12.5K+</span>
            <span className="stat-title">Total Students</span>
          </div>

          <div className="stat-separator"></div>

          <div className="stat-counter-item">
            <span className="stat-number">250+</span>
            <span className="stat-title">Total Teachers</span>
          </div>

          <div className="stat-separator"></div>

          <div className="stat-counter-item">
            <span className="stat-number">50+</span>
            <span className="stat-title">Total Courses</span>
          </div>
        </div>

        <div className="stats-student-visual">
          <img 
            src={getMedia('stats_student', '/assets/psittacus/stats-student.png')} 
            alt="Student with laptop" 
            className="stats-student-img" 
          />
        </div>
      </div>
    </section>
  );
}
